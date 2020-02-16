import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
    item: {
        backgroundColor: 'lightblue',
        padding: 20,
        paddingHorizontal: 100,
        marginVertical: 8,
        marginHorizontal: 16
    }
});

const Item = ({ id, title }) => {
    const navigation = useNavigation(); // For navigating the stack, see ../navigation/stacknavigation for how the stack looks
    // when you press the list, it navigates to the list screen, with the id of the list selected as a prop, so we can do a query for items in that list.

    return (
        <TouchableOpacity
            onPress={() => navigation.navigate('list', { id, title })}
            style={[styles.item]}
        >
            <Text>{title}</Text>
        </TouchableOpacity>
    );
};

Item.propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired
};

export default Item;
