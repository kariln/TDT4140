import React, { useContext } from 'react';
import { Text, TouchableOpacity, StyleSheet, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { GroupProps } from '../../store/StoreTypes';
import { Context } from '../../store/Store';
import getEnvVars from '../../../environment';

const styles = StyleSheet.create({
    buttonContainer: {
        flexDirection: 'row'
    },
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 18
    }
});

export interface GroupItemInterface {
    item: GroupProps;
}

// component that renders each indiviudal group that a user has been invited to
const ListItem: React.FC<GroupItemInterface> = props => {
    const [state, dispatch] = useContext(Context);

    const declineInvitation = () => {
        fetch(
            `${getEnvVars.apiUrl}groups/${props.item.id}/decline_group_invitation/`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Token ${state.authentication.token}`
                }
            }
        );
        dispatch({
            type: 'REMOVE_INVITEDGROUP',
            payload: props.item
        });
    };

    const acceptInvitation = () => {
        fetch(
            `${getEnvVars.apiUrl}groups/${props.item.id}/add_current_user_to_group/`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Token ${state.authentication.token}`
                }
            }
        );
        dispatch({
            type: 'ADD_GROUP',
            payload: props.item
        });
        dispatch({
            type: 'REMOVE_INVITEDGROUP',
            payload: props.item
        });
    };

    return (
        <View style={styles.container}>
            <Text>{props.item.name} </Text>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={{ paddingRight: 20 }}
                    onPress={acceptInvitation}
                >
                    <Icon
                        name="add"
                        type="material"
                        size={30}
                        color="#4880b7"
                    />
                </TouchableOpacity>
                <TouchableOpacity onPress={declineInvitation}>
                    <Icon
                        name="close"
                        type="material"
                        size={30}
                        color="#4880b7"
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default ListItem;
