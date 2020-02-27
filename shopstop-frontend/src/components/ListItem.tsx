import React from 'react';
import { Text } from 'react-native';
import { ListItemProps } from '../store/StoreTypes';

export interface ListItemInterface {
    item: ListItemProps;
}

const ListItem: React.FC<ListItemInterface> = props => {
    return <Text>denne varen er {props.item.name}</Text>;
};

export default ListItem;
