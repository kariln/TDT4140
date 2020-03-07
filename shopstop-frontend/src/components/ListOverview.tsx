import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, View, FlatList, Text } from 'react-native';
import { Context } from '../store/Store';
import { ListProps } from '../store/StoreTypes';
import ListsItem from './ListOverviewItem';
import getEnvVars from '../../environment';
import ListOverlay from './ListOverlay';
import AddListButton from './AddListButton';

const styles = StyleSheet.create({
    addButtonContainer: {
        flex: 1,
        justifyContent: 'flex-end'
    },
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

    useEffect(() => {
        setIsLoading(true);
        if (state.authentication.token && state.selectedGroup)
            fetch(
                `${getEnvVars.apiUrl}lists/list_by_group/?group=${state.selectedGroup}`,
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
                        type: 'SET_LISTS',
                        payload: data
                    });
                })
                .then(() => setIsLoading(false))
                .catch(e => console.log(e));
    }, [dispatch, state.authentication.token, state.selectedGroup]);

    if (isLoading) return <></>;

    if (state.lists.length === 0)
        return (
            <View style={styles.container}>
                <Text>Det finnes ingen handlelister i denne gruppen</Text>
                <View style={styles.addButtonContainer}>
                    <AddListButton />
                </View>
                {state.listOverlay.visible && <ListOverlay />}
            </View>
        );

    return (
        <View style={styles.container}>
            <FlatList
                data={state.lists}
                renderItem={({ item }: { item: ListProps }) => (
                    <ListsItem list={item} />
                )}
                keyExtractor={item => item.name}
            />
            <AddListButton />
            {state.listOverlay.visible && <ListOverlay />}
        </View>
    );
};

export default Lists;
