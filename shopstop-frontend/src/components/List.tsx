import React, { useEffect, useState, useContext } from 'react';
import { StyleSheet, View, FlatList, Button } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { Context } from '../store/Store';
import { useGetData, useAddData } from '../hooks/fetchHooks';
import ListItem from './ListItem';

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

type ListItemType = {
    id: number;
    name: string;
    quantity: number;
    bought: boolean;
    list: number;
};

const List = () => {
    const [state, dispatch] = useContext(Context);
    const [isLoading, setIsLoading] = useState(false);
    const navigation = useNavigation();
    const route = useRoute<ProfileScreenRouteProp>();

    // This useEffect is called whenever the component mounts
    useEffect(() => {
        setIsLoading(true);
        useGetData({ path: 'list-items' })
            .then(data =>
                dispatch({
                    type: 'SET_DATA',
                    payload: data,
                    onElement: 'listItems'
                })
            )
            .then(() => setIsLoading(false));
    }, []);

    // Sets the title of the header to the name of the list
    navigation.setOptions({
        title: route.params.name
    });

    if (isLoading) return <></>;
    return (
        <View style={styles.container}>
            <FlatList
                data={state.listItems}
                renderItem={({ item }) => <ListItem item={item} />}
                keyExtractor={item => item.id.toString()}
            />
        </View>
    );
};

export default List;

// Example function that both adds the new item to state and pusts it to the backend
/*
const addItem = () => {
    console.log('token ' + state.token);
    useAddData({
        path: 'list-items',
        data: {
            name: 'melk',
            quantity: 10,
            bought: false,
            list: 1
        },
        token: 'Token ' + state.token
    }).then(data => console.log(data));
    dispatch({
        type: 'ADD_DATA',
        payload: { id: 3, name: 'melk' },
        onElement: 'listItems'
    });
};
*/
