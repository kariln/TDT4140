import React, { useEffect, useState, useContext } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { Context } from '../store/Store';
import ListItem from './ListItem';
import { ListItemProps } from '../store/StoreTypes';
import getEnvVars from '../../environment';

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

    // This useEffect is called whenever the component mounts
    useEffect(() => {
        setIsLoading(true);
        fetch(`${getEnvVars.apiUrl}list-items/`)
            .then(result => result.json())
            .then(data =>
                dispatch({
                    type: 'SET_LISTITEMS',
                    payload: data
                })
            )
            .then(() => setIsLoading(false));
    }, [dispatch]);

    // Sets the title of the header to the name of the list
    navigation.setOptions({
        title: route.params.name
    });

    if (isLoading) return <></>;
    return (
        <View style={styles.container}>
            <FlatList
                data={state.listItems}
                renderItem={({ item }: { item: ListItemProps }) => (
                    <ListItem item={item} />
                )}
                keyExtractor={item => item.name}
            />
        </View>
    );
};

export default List;
