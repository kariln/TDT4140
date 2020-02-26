import React, { useState, useCallback, useEffect} from 'react';
import { StyleSheet, View, FlatList, Text, TouchableOpacity } from 'react-native';
import ListItem from './ListItem';
import ListEditOverlay from './ListEditOverlay';

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

    const [modalState, setModalState] = useState(false);
    const [selectedName, setSelectedName] = useState("");
    const [selectedId, setSelectedId] = useState("");
    const [selectedCount, setSelectedCount] = useState("0");

    function openEditModal(itemName, itemId) {
        setSelectedName(itemName)
        setSelectedId(itemId)
        setSelectedCount("0")
        setModalState(true)
    }


    return (
        <View style={styles.container}>
            {modalState && <ListEditOverlay modalState={modalState} setModalState={setModalState} itemName={selectedName} setSelectedName={setSelectedName} itemId={selectedId} itemCount={selectedCount} setSelectedCount={setSelectedCount}/>}
            <Text>id: {props.id}</Text>
            <FlatList
                data={DATA}
                renderItem={({ item }) => <TouchableOpacity onLongPress={() => openEditModal(item.name, item.id)}><ListItem item={item.name} /></TouchableOpacity>}
                keyExtractor={item => item.id}
            />
        </View>
    );
};

export default List;
