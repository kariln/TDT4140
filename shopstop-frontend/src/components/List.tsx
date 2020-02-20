import React, { useEffect, useState } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
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
    const [listItems, setListItems] = useState<ListItemType[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const navigation = useNavigation();
    const route = useRoute<ProfileScreenRouteProp>();

    // This useEffect is called whenever the component mounts
    useEffect(() => {
        setIsLoading(true);
        fetch(`https://staging.shopstop.xyz/listItems/`) // ${/*endre api-kall til en spesifikk liste her*/}
            .then(result => result.json())
            .then(data => setListItems(data))
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
                data={listItems}
                renderItem={({ item }) => <ListItem item={item.name} />}
                keyExtractor={item => item.id.toString()}
            />
        </View>
    );
};

export default List;
