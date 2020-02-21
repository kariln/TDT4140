import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, View, FlatList, Button } from 'react-native';
import { useToken, useGetData } from '../hooks/fetchHooks';
import ListsItem from './ListOverviewItem';
import { Context } from '../store/Store';

import * as SecureStore from 'expo-secure-store';

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        backgroundColor: '#fff',
        flex: 1,
        paddingTop: '10%'
    }
});

type ListType = {
    name: string;
    group: number;
    created_at: string;
    modified_at: string;
};

const Lists = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [state, dispatch] = useContext(Context);

    // This useEffect is called whenever the component mounts
    useEffect(() => {
        setIsLoading(true);
        // Custom hook which returns a token for authentication, should probably call this higher in the component structure, when the user has logged in, and not chain the requests, but i'm just doing it now to ensure that the token is ready before the ui is rendered
        useToken({ username: 'havardp', password: 'alko1233' })
            .then(token =>
                dispatch({
                    type: 'SET_DATA',
                    payload: token,
                    onElement: 'token'
                })
            )
            .then(
                useGetData({ path: 'lists' })
                    .then(data =>
                        dispatch({
                            type: 'SET_DATA',
                            payload: data,
                            onElement: 'lists'
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
                data={state.lists}
                renderItem={({ item }) => <ListsItem name={item.name} />}
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
