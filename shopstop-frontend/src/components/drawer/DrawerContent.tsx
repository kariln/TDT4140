import React, { useContext } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { Context } from '../../store/Store';
import GroupOverview from './GroupOverview';
import InvitedGroupOverview from './InvitedGroupOverview';
import AddGroupButton from './AddGroupButton';

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        backgroundColor: 'white',
        flex: 1,
        paddingTop: '15%'
    },
    divider: {
        alignSelf: 'stretch',
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        margin: 10
    },
    groupContainer: {
        flex: 8,
        width: '100%'
    },
    invitedGroupContainer: {
        flex: 2,
        width: '100%'
    },
    newGroupContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        width: '80%'
    }
});

// The top component of the drawer, everything we want rendered inside the drawer must be a child of this
const DrawerContent = () => {
    const [state, dispatch] = useContext(Context);

    const signOut = () => {
        dispatch({ type: 'SIGN_OUT' });
        SecureStore.deleteItemAsync('authToken');
        SecureStore.deleteItemAsync('username');
    };

    return (
        <View style={styles.container}>
            <View style={{ width: '80%' }}>
                <Text>
                    Signed in as:{' '}
                    <Text style={{ fontWeight: 'bold' }}>{state.username}</Text>
                </Text>
                <Button title="Sign out" onPress={signOut} />
            </View>
            <View style={styles.divider} />
            <View style={styles.groupContainer}>
                <GroupOverview />
            </View>
            <View style={styles.divider} />
            <View style={styles.invitedGroupContainer}>
                <InvitedGroupOverview />
            </View>
            <View style={styles.newGroupContainer}>
                <AddGroupButton />
            </View>
        </View>
    );
};

export default DrawerContent;
