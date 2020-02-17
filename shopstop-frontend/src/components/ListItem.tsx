import React from 'react';
import { Text } from 'react-native';

export interface ListItemInterface {
    item: string;
}

const ListItem: React.FC<ListItemInterface> = props => {
    return <Text>denne varen er {props.item}</Text>;
};

export default ListItem;
