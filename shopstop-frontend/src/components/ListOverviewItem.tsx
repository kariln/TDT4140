import React, { useContext } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Icon } from 'react-native-elements';
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger
} from 'react-native-popup-menu';
import { ListProps } from '../store/StoreTypes';
import { Context } from '../store/Store';
import getEnvVars from '../../environment';

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

interface ListOverviewItemProp {
    list: ListProps;
}

const Item: React.FC<ListOverviewItemProp> = props => {
    const navigation = useNavigation(); // For navigating the stack, see ../navigation/stacknavigation for how the stack looks
    // when you press the list, it navigates to the list screen, with the id of the list selected as a prop, so we can do a query for items in that list.
    const [state, dispatch] = useContext(Context);
    const { name, id } = props.list;

    const deleteListItem = () => {
        dispatch({
            type: 'REMOVE_LIST',
            payload: {
                id
            }
        });

        fetch(`${getEnvVars.apiUrl}lists/${id}/`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Token ${state.token}`
            }
        });
    };

    return (
        <TouchableOpacity
            onPress={() => {
                dispatch({
                    type: 'SET_SELECTEDLIST',
                    payload: id
                });
                navigation.navigate('list', { name });
            }}
            style={styles.listItem}
        >
            <Text style={styles.itemLeft}>{name}</Text>
            <Menu>
                <MenuTrigger>
                    <Icon name="more-vert" type="material" />
                </MenuTrigger>
                <MenuOptions optionsContainerStyle={{ marginTop: 30 }}>
                    <MenuOption
                        onSelect={() =>
                            dispatch({
                                type: 'TOGGLE_LISTOVERLAY',
                                payload: {
                                    visible: true,
                                    type: 'change',
                                    id
                                }
                            })
                        }
                        text="Edit"
                        customStyles={{ optionWrapper: { padding: 20 } }}
                    />
                    <MenuOption
                        onSelect={deleteListItem}
                        text="Delete"
                        customStyles={{ optionWrapper: { padding: 20 } }}
                    />
                </MenuOptions>
            </Menu>
        </TouchableOpacity>
    );
};

export default Item;
