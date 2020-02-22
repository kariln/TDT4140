import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import { GetToken } from '../utils/Utils';
import ListsItem from './ListOverviewItem';
import { Context } from '../store/Store';
import { ListProps } from '../store/StoreTypes';
import getEnvVars from '../../environment';

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
    const [state, dispatch] = useContext(Context);
    if (!state.token)
        GetToken({ username: 'havardp', password: 'alko1233' }).then(token =>
            dispatch({
                type: 'SET_TOKEN',
                payload: token
            })
        );

    // This useEffect is called whenever the component mounts
    useEffect(() => {
        setIsLoading(true);

        fetch(`${getEnvVars.apiUrl}lists/`)
            .then(result => result.json())
            .then(data =>
                dispatch({
                    type: 'SET_LISTS',
                    payload: data
                })
            )
            .then(() => setIsLoading(false))
            .catch(e => console.log(e));
    }, [dispatch]);

    if (isLoading) return <></>;
    return (
        <View style={styles.container}>
            <FlatList
                data={state.lists}
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

// Example of how to add elements to the list state and database
// See reducer.tsx for list of actions on dispatch
<Button
    title="add"
    onPress={() => {
        dispatch({
            type: 'ADD_LIST',
            payload: {
                name: 'testliste',
                group: 1,
                created_at: 'test',
                modified_at: 'test'
            }
        });

        //this doesn't work right now because it needs correct time strings, but that should probably be made on the backend anyway
        fetch(getEnvVars.apiUrl + 'lists/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Token ' + state.token
            },
            body: JSON.stringify({
                name: 'testliste',
                group: 1,
                created_at: 'test',
                modified_at: 'test'
            })
        })
            .then(response => response.json())
            .then(json => console.log(json));
    }}
/>

*/
