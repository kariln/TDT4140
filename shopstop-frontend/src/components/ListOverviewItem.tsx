import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Icon } from 'react-native-elements';
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger
} from 'react-native-popup-menu';

const styles = StyleSheet.create({
    itemLeft: {
        padding: 5,
        paddingRight: 140
    },
    listItem: {
        backgroundColor: 'lightblue',
        borderRadius: 10,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 8,
        padding: 20
    }
});

export interface ListOverViewItemInterface {
    name: string;
}

const Item: React.FC<ListOverViewItemInterface> = props => {
    const navigation = useNavigation(); // For navigating the stack, see ../navigation/stacknavigation for how the stack looks
    // when you press the list, it navigates to the list screen, with the id of the list selected as a prop, so we can do a query for items in that list.
    const { name } = props;

    return (
        <TouchableOpacity
            onPress={() => navigation.navigate('list', { name })}
            style={styles.listItem}
        >
            <Text style={styles.itemLeft}>{name}</Text>
            <Menu>
                <MenuTrigger>
                    <Icon name="more-vert" type="material" />
                </MenuTrigger>
                <MenuOptions optionsContainerStyle={{ marginTop: 30 }}>
                    <MenuOption
                        onSelect={() => console.log(`Edit`)}
                        text="Edit"
                    />
                    <MenuOption
                        onSelect={() => console.log(`Delete`)}
                        text="Delete"
                    />
                </MenuOptions>
            </Menu>
        </TouchableOpacity>
    );
};

export default Item;
