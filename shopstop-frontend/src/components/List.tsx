import React, { useEffect, useState, useContext } from 'react';
import { StyleSheet, FlatList, Text, KeyboardAvoidingView } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { Context } from '../store/Store';
import ListItem from './ListItem';
import { ListItemProps } from '../store/StoreTypes';
import getEnvVars from '../../environment';
import TextField from './TextField';

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        backgroundColor: '#fff',
        flex: 1,
        justifyContent: 'flex-end',
        marginBottom: '-9%',
        paddingTop: '20%'
    },
    text: {
        flex: 1,
        marginTop: 1
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

    if (isLoading) return <></>; // can have a loading icon or something here if we want.
    if (state.listItems.length === 0)
        return (
            <KeyboardAvoidingView
                style={styles.container}
                behavior="padding"
                keyboardVerticalOffset={50}
            >
                <Text style={styles.text}>
                    Du har ingen varer i handlelisten din
                </Text>
                <TextField />
            </KeyboardAvoidingView>
        );
    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior="padding"
            keyboardVerticalOffset={50}
        >
            <FlatList
                data={state.listItems}
                renderItem={({ item }: { item: ListItemProps }) => (
                    <ListItem item={item} />
                )}
                keyExtractor={item => item.name}
            />
            <TextField />
        </KeyboardAvoidingView>
    );
};

export default List;
