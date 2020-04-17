import React, { useState, useContext } from 'react';
import { View, StyleSheet, TextInput, Text, Button } from 'react-native';
import getEnvVars from '../../../environment';
import { Context } from '../../store/Store';
import { GroupProps } from '../../store/StoreTypes';

const styles = StyleSheet.create({
    alert: {
        fontWeight: 'bold'
    },
    container: {
        alignItems: 'center',
        fontSize: 14,
        justifyContent: 'center'
    },
    input: {
        backgroundColor: '#fafafa',
        borderColor: 'gray',
        borderRadius: 4,
        borderWidth: 0.1,
        height: 40,
        margin: 10,
        paddingLeft: 10,
        width: '80%'
    },
    text: {
        margin: 5
    }
});

// screen to invite a user to the group
const GroupInvitation = () => {
    const [context] = useContext(Context);
    const [state, setstate] = useState({ username: '', status: '' });
    const [groupName] = useState(
        context.groups.find(
            (group: GroupProps) => group.id === context.selectedGroup
        ).name
    );

    const onSubmit = () => {
        setstate({ ...state, status: 'Loading...' });
        fetch(
            `${getEnvVars.apiUrl}groups/${context.selectedGroup}/invite_user_to_group/`,
            {
                method: 'POST',
                body: JSON.stringify({ username: state.username }),
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Token ${context.authentication.token}`
                }
            }
        )
            .then(result => {
                if (result.status === 404)
                    setstate({ ...state, status: 'Could not find user!' });
                else if (result.status !== 200)
                    setstate({ ...state, status: 'Something went wrong!' });
                else setstate({ ...state, status: 'User invited!' });
                return result.json();
            })
            .catch(e => {
                console.log(e);
                setstate({ ...state, status: 'Something went wrong!' });
            });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.alert}>{state.status}</Text>
            <Text style={styles.text}>Invite user to {groupName}</Text>
            <TextInput
                style={styles.input}
                onChangeText={text => setstate({ ...state, username: text })}
                value={state.username}
                placeholder="username"
            />
            <Button title="Invite" onPress={onSubmit} />
        </View>
    );
};

export default GroupInvitation;
