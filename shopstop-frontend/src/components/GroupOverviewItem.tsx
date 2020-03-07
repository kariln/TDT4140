import React, { useContext } from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import { GroupProps } from '../store/StoreTypes';
import { Context } from '../store/Store';

const styles = StyleSheet.create({
    activeContainer: {
        backgroundColor: '#B0B0B0',
        padding: 18
    },
    container: {
        padding: 18
    },
    text: {}
});

export interface GroupItemInterface {
    item: GroupProps;
}

const ListItem: React.FC<GroupItemInterface> = props => {
    const [state, dispatch] = useContext(Context);
    const navigation = useNavigation();

    return (
        <TouchableOpacity
            style={
                props.item.id === state.selectedGroup
                    ? styles.activeContainer
                    : styles.container
            }
            onPress={() => {
                dispatch({
                    type: 'SET_SELECTEDGROUP',
                    payload: props.item.id
                });
                navigation.dispatch(DrawerActions.closeDrawer());
            }}
        >
            <Text style={styles.text}>{props.item.name} </Text>
        </TouchableOpacity>
    );
};

export default ListItem;
