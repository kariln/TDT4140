import React, { useEffect, useState, useContext } from 'react';
import {
    StyleSheet,
    View,
    FlatList,
    Text,
    TouchableOpacity
} from 'react-native';
import { Icon } from 'react-native-elements';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { Context } from '../store/Store';
import ListItem from './ListItem';
import { ListItemProps } from '../store/StoreTypes';
import getEnvVars from '../../environment';
import ListEditOverlay from './ListEditOverlay';

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        backgroundColor: '#fff',
        flex: 1,
        paddingTop: '20%'
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
    const [modalState, setModalState] = useState(false);
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
    const deleteListItem = (item: ListItemProps) => {
        dispatch({
            type: 'REMOVE_LISTITEM',
            payload: {
                id: item.id
            }
        });

        fetch(`${getEnvVars.apiUrl}list-items/${item.id}/`, {
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
            setModalState(true);
        } else {
            console.log('Attempted to open an item that does not exist');
        }
    }

    // This useEffect is called whenever the component mounts
    useEffect(() => {
        setIsLoading(true);

        if (state.authentication.token)
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
                <Text>Du har ingen varer i handlelisten din</Text>
            </View>
        );
    return (
        <View style={styles.container}>
            {modalState && (
                <ListEditOverlay
                    modalState={modalState}
                    setModalState={setModalState}
                    item={selectedItem}
                    deleteListItem={deleteListItem}
                    changeListItem={changeListItem}
                />
            )}
            <FlatList
                data={state.listItems}
                renderItem={({ item }: { item: ListItemProps }) => (
                    <TouchableOpacity onLongPress={() => openEditModal(item)}>
                        <ListItem item={item} />
                    </TouchableOpacity>
                )}
                keyExtractor={item => item.name}
            />
        </View>
    );
};

export default List;
