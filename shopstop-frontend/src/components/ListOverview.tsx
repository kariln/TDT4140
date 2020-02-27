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
        GetToken({ username: 'havardp', password: 'alko1233' }).then(token => {
            dispatch({
                type: 'SET_TOKEN',
                payload: token
            });
        });

    // This useEffect is called whenever the component mounts
    useEffect(() => {
        setIsLoading(true);
        if (state.token)
            fetch(`${getEnvVars.apiUrl}lists/`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Token ' + state.token
                }
            })
                .then(result => result.json())
                .then(data =>
                    dispatch({
                        type: 'SET_LISTS',
                        payload: data
                    })
                )
                .then(() => setIsLoading(false))
                .catch(e => console.log(e));
    }, [dispatch, state.token]);
    if (isLoading) return <></>;
    return (
        <View style={styles.container}>
            <FlatList
                data={state.lists}
                renderItem={({ item }: { item: ListProps }) => {
                    return <ListsItem list={item} />;
                }}
                keyExtractor={item => item.name}
            />
        </View>
    );
};

export default Lists;
