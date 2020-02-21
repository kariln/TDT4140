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
    // Deletes a specific listitem through the backend.
    /* const deleteData = () => {
        fetch(`https://staging.shopstop.xyz/listItems/${props.item.id}/`, {
            method: 'DELETE'
        })
            .then(response => response.json())
            .then(json => console.log(json));
    }; */
    // Changes the resource, can also use PATCH, to only update changed data
    /* const changeData = (data: ListItemInterface) => {
        fetch(`https://staging.shopstop.xyz/listItems/${props.item.id}/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(json => console.log(json));
    }; */

    return <Text>denne varen er {props.item.name}</Text>;
};

export default ListItem;
