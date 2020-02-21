import React from 'react';
import { Text } from 'react-native';

export interface ListItemInterface {
    item: ListItemProp;
}

interface ListItemProp {
    id: number;
    name: string;
    quantity: number;
    bought: boolean;
    list: number;
}

const ListItem: React.FC<ListItemInterface> = props => {
    console.log(props);
    return <Text>denne varen er {props.item.name}</Text>;
};

export default ListItem;
