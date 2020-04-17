import React, { useContext } from 'react';
import { Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import { Icon } from 'react-native-elements';
import { GroupProps } from '../../store/StoreTypes';
import { Context } from '../../store/Store';
import getEnvVars from '../../../environment';

const styles = StyleSheet.create({
    activeContainer: {
        backgroundColor: '#B0B0B0',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 18
    },
    button: {},
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 18
    },
    text: {}
});

export interface GroupItemInterface {
    item: GroupProps;
}

// component that renders each individual group the user is part of
const ListItem: React.FC<GroupItemInterface> = props => {
    const [state, dispatch] = useContext(Context);
    const navigation = useNavigation();

    const removeUserFromGroup = () => {
        fetch(
            `${getEnvVars.apiUrl}groups/${props.item.id}/remove_current_user_from_group/`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Token ${state.authentication.token}`
                }
            }
        );
        dispatch({
            type: 'REMOVE_GROUP',
            payload: props.item
        });
        dispatch({
            type: 'ADD_INVITEDGROUP',
            payload: props.item
        });
    };

    const confirmationAlert = () => {
        Alert.alert(
            'Are you sure you want to leave the group?',
            'You would have to get an invite from another user to join the group again',
            [
                {
                    text: 'Cancel',
                    style: 'cancel'
                },
                { text: 'OK', onPress: removeUserFromGroup }
            ],
            { cancelable: true }
        );
    };

    const enterGroup = () => {
        dispatch({
            type: 'SET_SELECTEDGROUP',
            payload: props.item.id
        });
        navigation.dispatch(DrawerActions.closeDrawer());
    };

    return (
        <TouchableOpacity
            style={
                props.item.id === state.selectedGroup
                    ? styles.activeContainer
                    : styles.container
            }
            onPress={enterGroup}
        >
            <Text style={styles.text}>{props.item.name} </Text>
            <TouchableOpacity style={styles.button} onPress={confirmationAlert}>
                <Icon name="close" type="material" size={30} color="#4880b7" />
            </TouchableOpacity>
        </TouchableOpacity>
    );
};

export default ListItem;
