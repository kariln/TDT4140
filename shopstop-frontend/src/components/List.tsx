import React from 'react';
import { StyleSheet, View, FlatList, Text } from 'react-native';
import ListItem from './ListItem';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        paddingTop: '20%'
    }
});

const List = ({ route }) => {
    const { id } = route.params; // this is the id that we do the query on

    // mock data av varer i handlelisten
    const DATA = [
        {
            id: '1a',
            name: 'egg'
        },
        {
            id: '2b',
            name: 'smørr'
        },
        {
            id: '3c',
            name: 'kake'
        }
    ];
    return (
        <View style={styles.container}>
            <Text>id: {id}</Text>
            <FlatList
                data={DATA}
                renderItem={({ item }) => <ListItem item={item.name} />}
                keyExtractor={item => item.id}
            />
        </View>
    );
};

export default List;
