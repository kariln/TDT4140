import React, { useEffect, useState, useContext } from 'react';
import { StyleSheet, View, FlatList, Text, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import getEnvVars from '../../../environment';
import { Context } from '../../store/Store';
import { ListItemProps } from '../../store/StoreTypes';
import ListItem from './ListItem';
import ListEditOverlay from '../overlay/ListEditOverlay';
import ConfirmDeleteItem from '../overlay/ConfirmDeleteItem';

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        backgroundColor: '#fff',
        flex: 1,
        paddingTop: '5%'
    }
});

// These lines below makes a new type for the route prop which we use in to type the useRoute hook.
type RootStackParamList = {
    list: { name: string };
};
type ProfileScreenRouteProp = RouteProp<RootStackParamList, 'list'>;

const List = () => {
    const [state, dispatch] = useContext(Context);
    const [isLoading, setIsLoading] = useState(true);
    const navigation = useNavigation();
    const route = useRoute<ProfileScreenRouteProp>();

    // variable to open or close the modal
    const [editModalState, setEditModalState] = useState(false);
    const [deleteModalState, setDeleteModalState] = useState(false);

    const [markedForDelete, setMarkedForDelete] = useState([]);
    const [deleteMode, setDeleteMode] = useState(false)

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
        console.log("Editing item")
        console.log(editedItem)
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
        })
            .then(res => res.json())
            .then(data => console.log(data));
    };

    // Function to delete an item in a list
    const deleteListItem = (id: Number) => {
        dispatch({
            type: 'REMOVE_LISTITEM',
            payload: {
                id: id
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

    function openEditModal(item: ListItemProps) {
        if (item !== undefined) {
            updateSelectedItem(item);
            setEditModalState(true);
        } else {
            console.log('Attempted to open an item that does not exist');
        }
    }

    function closeEditModal() {
        setEditModalState(false);
    }

    function closeDeleteModal() {
        console.log("Delete closed")
        setDeleteModalState(false);
        setDeleteMode(false)
    }

    function closeDeleteModalAndDelete() {
        console.log("Delete all")
        setDeleteModalState(false);
        setDeleteMode(false)
    }

    function selectForDelete( id: Number ){
        if (markedForDelete.indexOf(id) > -1){ // If the item is in the markedForDelete
            setMarkedForDelete(markedForDelete.filter(function(value, index, arr){ return value !== id}))
        } else {
            setMarkedForDelete([...markedForDelete, id]);
        }
    }

    function toggleDeleteMode() {
        if (deleteMode == true) {
            if ( markedForDelete.length >= 1){
                setDeleteModalState(true)
                console.log("opening modal for deleting items")
            } else {
                console.log("Attempted to open modal for deleting items witn 0 items")
                setDeleteMode(false)
            }
        } else {
            setDeleteMode(true)
            console.log("Entering delete mode")
        }
    }

    // This useEffect is called whenever the component mounts
    useEffect(() => {
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
                name="hourglass-empty"
                type="material"
                color="#4880b7"
            />
        ); // can have a loading icon or something here if we want.
    if (state.listItems.length === 0)
        return (
            <View style={styles.container}>
                <Text>Your shopping list is empty!</Text>
            </View>
        );
    return (
        <View style={styles.container}>
            <View
                style={{
                    alignSelf: 'center',
                    flexDirection: 'row',
                    justifyContent: 'center'
                }}
            >
                {/*<View style={{ flex: 2 }} />
                <Text style={{ flex: 10, fontSize: 20, paddingRight: 10 }}>
                    Select the items to delete
                </Text>
                <View style={{ flex: 2 , paddingRight: 10  }} />*/}
                <View style={{ flex: 2 }} />
                <Text style={{ flex: 8, fontSize: 20, paddingRight: 10 }}>
                    Item
                </Text>
                <Text style={{ flex: 2, fontSize: 20, paddingLeft: 10 }}>
                    Qty.
                </Text>
                <View style={{ flex: 2 }}>
                    <TouchableOpacity onPress={() => toggleDeleteMode()}>
                        <Icon
                            name={deleteMode === true ? 'done' : 'delete'}
                            size={30}
                        />
                    </TouchableOpacity>
                </View>
            </View>
            <FlatList
                style={{ width: '100%', height: '100%' }}
                data={state.listItems}
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
                        markedForDelete={markedForDelete.indexOf(item.id) > -1}
                    />
                )}
                keyExtractor={item => item.id.toString()}
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
                    n_ids={markedForDelete.length}
                />
            )}
        </View>
    );
};

export default List;
