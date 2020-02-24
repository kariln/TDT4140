import React from 'react';
import { StyleSheet, View, FlatList, Text } from 'react-native';
import ListItem from './ListItem';

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        backgroundColor: '#fff',
        flex: 1,
        paddingTop: '20%'
    }
});

export interface ListInterface {
    id: string;
}

const List: React.FC<ListInterface> = props => {
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
            <Text>id: {props.id}</Text>
            <FlatList
                data={DATA}
                renderItem={({ item }) => <ListItem item={item.name} />}
                keyExtractor={item => item.id}
            />
        </View>
    );
};

export default List;