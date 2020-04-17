import React, { useEffect, useState, useContext } from 'react';
import {
    StyleSheet,
    View,
    FlatList,
    Text,
    KeyboardAvoidingView,
    Platform,
    TouchableOpacity
} from 'react-native';
import { Icon, Tooltip } from 'react-native-elements';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { useHeaderHeight } from '@react-navigation/stack';
import { sortBy, filter } from 'lodash';
import getEnvVars from '../../../environment';
import { Context } from '../../store/Store';
import { ListItemProps, RemoveListProps } from '../../store/StoreTypes';
import ListItem from './ListItem';
import ListEditOverlay from '../overlay/ListEditOverlay';
import TextField from './TextField';
import ConfirmDeleteItem from '../overlay/ConfirmDeleteItem';

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flex: 1,
        justifyContent: 'space-between'
    },
    text: {
        alignSelf: 'center',
        paddingTop: '5%'
    }
});

// These lines below makes a new type for the route prop which we use in to type the useRoute hook.
type RootStackParamList = {
    list: { name: string };
};
type ProfileScreenRouteProp = RouteProp<RootStackParamList, 'list'>;

// component that renders each ListItem in the current list
const List = () => {
    const [state, dispatch] = useContext(Context);
    const [isLoading, setIsLoading] = useState(true);
    const navigation = useNavigation();
    const route = useRoute<ProfileScreenRouteProp>();
    const headerHeight = useHeaderHeight();

    // variable to open or close the modal
    const [editModalState, setEditModalState] = useState(false);
    const [deleteModalState, setDeleteModalState] = useState(false);

    const [deleteMode, setDeleteMode] = useState(false);
    const [hideBoughtMode, setHideBoughtMode] = useState(false);

    // variable to hold the selected item
    const [selectedItem, updateSelectedItem] = useState({
        id: 0,
        name: '',
        quantity: 0,
        bought: false,
        list: 0
    });

    // function to change/update the value of an item in a list
    const changeListItem = (editedItem: ListItemProps) => {
        dispatch({
            type: 'EDIT_LISTITEM',
            payload: {
                id: editedItem.id,
                quantity: editedItem.quantity,
                name: editedItem.name,
                bought: editedItem.bought,
                list: editedItem.list
            }
        });
        fetch(`${getEnvVars.apiUrl}list-items/${editedItem.id}/`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Token ${state.authentication.token}`
            },
            body: JSON.stringify({
                name: editedItem.name,
                quantity: editedItem.quantity,
                bought: editedItem.bought,
                list: editedItem.list
            })
        });
    };

    // Function to delete an item in a list
    const deleteListItem = (id: number) => {
        dispatch({
            type: 'REMOVE_LISTITEM',
            payload: {
                id
            }
        });

        fetch(`${getEnvVars.apiUrl}list-items/${id}/`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Token ${state.authentication.token}`
            }
        });
    };

    function updateTutorial(tutorialItem: string) {
        dispatch({
            type: 'SET_TUTORIAL_LIST',
            payload: {
                ...state.tutorial,
                [tutorialItem]: true
            }
        });
    }

    function openEditModal(item: ListItemProps) {
        if (item !== undefined) {
            updateSelectedItem(item);
            setEditModalState(true);
        }
    }

    function closeEditModal() {
        setEditModalState(false);
    }

    function closeDeleteModal() {
        dispatch({
            type: 'DELETE_REMOVELIST',
            payload: {}
        });
        setDeleteModalState(false);
        setDeleteMode(false);
    }

    function closeDeleteModalAndDelete() {
        [...state.removeList].forEach(item => {
            deleteListItem(item.id);
        });
        dispatch({
            type: 'DELETE_REMOVELIST',
            payload: {}
        });
        setDeleteModalState(false);
        setDeleteMode(false);
    }

    function selectForDelete(id: number) {
        if (
            state.removeList.find(
                (element: RemoveListProps) => element.id === id
            ) === undefined
        ) {
            dispatch({
                type: 'APPEND_REMOVELIST',
                payload: {
                    id
                }
            });
        } else {
            dispatch({
                type: 'REMOVE_REMOVELIST',
                payload: {
                    id
                }
            });
        }
    }

    function toggleDeleteMode() {
        if (deleteMode === true) {
            if (state.removeList.length >= 1) {
                setDeleteModalState(true);
            } else {
                setDeleteMode(false);
            }
        } else {
            setDeleteMode(true);
        }
    }

    // This useEffect is called whenever the component mounts
    useEffect(() => {
        setIsLoading(true);

        if (state.selectedList)
            fetch(
                `${getEnvVars.apiUrl}list-items/list_items_by_list/?list=${state.selectedList}`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Token ${state.authentication.token}`
                    }
                }
            )
                .then(result => result.json())
                .then(data => {
                    dispatch({
                        type: 'SET_LISTITEMS',
                        payload: data
                    });
                })
                .then(() => setIsLoading(false));
    }, [dispatch, state.authentication.token, state.selectedList]);
    // Sets the title of the header to the name of the list
    navigation.setOptions({
        title: route.params.name
    });

    if (isLoading)
        return (
            <Icon
                size={80}
                name="access-time"
                type="material"
                color="lightblue"
            />
        );

    if (state.listItems.length === 0)
        return (
            <KeyboardAvoidingView
                style={styles.container}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={headerHeight}
            >
                <Text style={styles.text}>
                    There are no items in the shopping list.
                </Text>
                <TextField />
            </KeyboardAvoidingView>
        );

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={headerHeight}
        >
            // This is the header of the list, with the eit buttons
            <View
                style={{
                    alignSelf: 'center',
                    flexDirection: 'row',
                    justifyContent: 'center'
                }}
            >
                <View style={{ flex: 2 }}>
                    <TouchableOpacity onPress={() => toggleDeleteMode()}>
                        <Tooltip
                            backgroundColor="#d00"
                            toggleOnPress={!state.tutorial.deleteMode}
                            popover={
                                <Text style={{ color: '#fff' }}>
                                    Tap here to enter/exit delete mode
                                </Text>
                            }
                            onClose={() => {
                                updateTutorial('deleteMode');
                                toggleDeleteMode();
                            }}
                        >
                            <Icon
                                name={
                                    deleteMode === true
                                        ? state.removeList.length > 0
                                            ? 'check-circle'
                                            : 'cancel'
                                        : 'delete'
                                }
                                color={
                                    state.removeList.length > 0
                                        ? '#DD0000'
                                        : '#000000'
                                }
                                size={40}
                            />
                        </Tooltip>
                    </TouchableOpacity>
                </View>
                <Text
                    style={{
                        flex: 8,
                        fontSize: 20,
                        paddingRight: 10,
                        alignSelf: 'center'
                    }}
                >
                    Item
                </Text>
                <Text
                    style={{
                        flex: 2,
                        fontSize: 20,
                        paddingLeft: 10,
                        alignSelf: 'center'
                    }}
                >
                    Qty.
                </Text>
                <View style={{ flex: 2 }}>
                    <TouchableOpacity
                        onPress={() => setHideBoughtMode(!hideBoughtMode)}
                    >
                        <Tooltip
                            backgroundColor="#00d"
                            toggleOnPress={!state.tutorial.viewBoughtMode}
                            popover={
                                <Text style={{ color: '#fff' }}>
                                    Tap here to hide or show bought items
                                </Text>
                            }
                            onClose={() => {
                                updateTutorial('viewBoughtMode');
                                setHideBoughtMode(!hideBoughtMode);
                            }}
                        >
                            <Icon
                                size={40}
                                name={
                                    hideBoughtMode === true ? 'eye-off' : 'eye'
                                } // hides the bought items
                                type="material-community"
                            />
                        </Tooltip>
                    </TouchableOpacity>
                </View>
            </View>
            <View
                style={{ height: 2, width: '100%', backgroundColor: '#000' }}
            />
            // This is the rendering of the list
            <FlatList
                style={{ width: '100%', height: '100%' }}
                data={
                    hideBoughtMode // Only render the items that are not bought if this is true
                        ? filter(sortBy(state.listItems, ['id']), [
                              'bought',
                              false
                          ])
                        : sortBy(state.listItems, ['id'])
                }
                renderItem={({
                    item,
                    index
                }: {
                    item: ListItemProps;
                    index: number;
                }) => (
                    <ListItem
                        item={item}
                        openEditModal={openEditModal}
                        changeListItem={changeListItem}
                        index={index}
                        selectForDelete={selectForDelete}
                        deleteMode={deleteMode}
                        updateTutorial={updateTutorial}
                        tutorial={state.tutorial}
                        markedForDelete={
                            state.removeList.find(
                                (element: RemoveListProps) =>
                                    element.id === item.id
                            ) !== undefined
                        }
                    />
                )}
                keyExtractor={item => String(item.id)}
            />
            {editModalState && (
                <ListEditOverlay
                    closeModal={closeEditModal}
                    item={selectedItem}
                    deleteListItem={deleteListItem}
                    changeListItem={changeListItem}
                />
            )}
            {deleteModalState && (
                <ConfirmDeleteItem
                    closeModal={closeDeleteModal}
                    closeDeleteModalAndDelete={closeDeleteModalAndDelete}
                    n_ids={state.removeList.length}
                />
            )}
            <TextField />
        </KeyboardAvoidingView>
    );
};

export default List;
