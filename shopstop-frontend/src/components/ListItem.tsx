import React from 'react';
import { Text } from 'react-native';
import PropTypes from 'prop-types';

const ListItem = ({ item }) => {
    return <Text>denne varen er {item}</Text>;
};

ListItem.propTypes = {
    item: PropTypes.string.isRequired
};

export default ListItem;
