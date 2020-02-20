import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const styles = StyleSheet.create({
    item: {
        backgroundColor: 'lightblue',
        padding: 20,
        paddingHorizontal: 100,
        marginVertical: 8,
        marginHorizontal: 16
    }
});

export interface ListOverViewItemInterface {
    id: string;
    title: string;
}

const Item: React.FC<ListOverViewItemInterface> = props => {
    const navigation = useNavigation(); // For navigating the stack, see ../navigation/stacknavigation for how the stack looks
    // when you press the list, it navigates to the list screen, with the id of the list selected as a prop, so we can do a query for items in that list.
    const { id } = props;
    return (
        <TouchableOpacity
            onPress={() => navigation.navigate('list', { id })}
            style={styles.item}
        >
            <Text>{props.title}</Text>
        </TouchableOpacity>
    );
};

export default Item;
