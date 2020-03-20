import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, View, FlatList, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Context } from '../../store/Store';
import { ListProps } from '../../store/StoreTypes';
import ListsItem from './ListOverviewItem';
import getEnvVars from '../../../environment';
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
        padding: 20,
        paddingTop: '10%'
    }
});

const Lists = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [state, dispatch] = useContext(Context);
    const navigation = useNavigation();

    useEffect(() => {
        // Sets the title in the navbar to the name of the group the user has selected
        const setTitle = async () => {
            const thisGroup = await state.groups.find(
                (groups: ListProps) => groups.id === state.selectedGroup
            );
            if (thisGroup)
                navigation.setOptions({
                    title: thisGroup.name
                });
            else
                navigation.setOptions({
                    title: ''
                });
        };

        if (state.selectedGroup) {
            setTitle();
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
        }
    }, [
        dispatch,
        navigation,
        state.authentication.token,
        state.groups,
        state.selectedGroup
    ]);

    if (isLoading) return <></>;

    if (state.groups.length === 0)
        return (
            <View style={styles.container}>
                <Text>
                    You are currently not in a group, you can join a group
                    through the sidebar.
                </Text>
            </View>
        );

    if (state.lists.length === 0)
        return (
            <View style={styles.container}>
                <Text>
                    There are no shopping lists in this group, add one on the
                    button below.
                </Text>
                <View style={styles.addButtonContainer}>
                    <AddListButton />
                </View>
            </View>
        );

    return (
        <View style={styles.container}>
            <FlatList
                data={state.lists}
                renderItem={({ item }: { item: ListProps }) => (
                    <ListsItem list={item} />
                )}
                keyExtractor={item => item.id.toString()}
            />
            <AddListButton />
        </View>
    );
};

export default Lists;
