import React, { useState, useEffect } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import ListsItem from './ListOverviewItem';

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
    const [lists, setLists] = useState<ListType[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    // This useEffect is called whenever the component mounts
    useEffect(() => {
        setIsLoading(true);
        fetch('https://staging.shopstop.xyz/lists/')
            .then(result => result.json())
            .then(data => setLists(data))
            .then(() => setIsLoading(false));
    }, []);

    if (isLoading) return <></>;
    return (
        <View style={styles.container}>
            <FlatList
                data={lists}
                renderItem={({ item }) => <ListsItem name={item.name} />}
                keyExtractor={item => item.name}
            />
        </View>
    );
};

export default Lists;
