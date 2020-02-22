import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, View, FlatList, Button } from 'react-native';
import { useToken, useGetData } from '../hooks/fetchHooks';
import ListsItem from './ListOverviewItem';
import { Context } from '../store/Store';
import { ListProps } from '../store/StoreTypes';

import * as SecureStore from 'expo-secure-store';

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        backgroundColor: '#fff',
        flex: 1,
        paddingTop: '10%'
    }
});

const Lists = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [{ lists, token }, dispatch] = useContext(Context);

    // This useEffect is called whenever the component mounts
    useEffect(() => {
        setIsLoading(true);
        // Custom hook which returns a token for authentication, should probably call this higher in the component structure, when the user has logged in, and not chain the requests, but i'm just doing it now to ensure that the token is ready before the ui is rendered

        //SecureStore.deleteItemAsync('authToken');
        useToken({ username: 'havardp', password: 'alko1233' })
            .then(token =>
                dispatch({
                    type: 'SET_TOKEN',
                    payload: token
                })
            )
            .then(() =>
                useGetData({ path: 'lists' })
                    .then(data =>
                        dispatch({
                            type: 'SET_LISTS',
                            payload: data
                        })
                    )
                    .then(() => setIsLoading(false))
                    .catch(e => console.log(e))
            );
    }, []);
    if (isLoading) return <></>;
    return (
        <View style={styles.container}>
            <FlatList
                data={lists}
                renderItem={({ item }: { item: ListProps }) => (
                    <ListsItem name={item.name} />
                )}
                keyExtractor={item => item.name}
            />
        </View>
    );
};

export default Lists;

/*

// Example of how to add elements to the list state
<Button
    title="add"
    onPress={() =>
        dispatch({
            type: 'ADD_DATA',
            payload: {
                name: 'testliste',
                group: 1,
                created_at: 'test',
                modified_at: 'test'
            },
            onElement: 'lists'
        })
    }
/>

*/
