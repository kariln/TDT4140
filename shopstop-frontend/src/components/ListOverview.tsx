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

const Lists = () => {
    const [lists, setLists] = useState([]);

    useEffect(() => {
        fetch('https://staging.shopstop.xyz/lists/')
            .then(result => result.json())
            .then(data => setLists(data));
    }, []);

    return (
        <View style={styles.container}>
            <FlatList
                data={lists}
                renderItem={({ item }) => <ListsItem title={item.name} />}
                keyExtractor={item => item.name}
            />
        </View>
    );
};

export default Lists;
