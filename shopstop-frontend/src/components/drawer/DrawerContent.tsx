import React, { useContext } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { Context } from '../../store/Store';
import GroupOverview from './GroupOverview';
import AddGroupButton from './AddGroupButton';

const styles = StyleSheet.create({
    addGroupContainer: {
        flex: 1,
        justifyContent: 'flex-end'
    },
    container: {
        alignItems: 'center',
        backgroundColor: 'white',
        flex: 1,
        paddingTop: '30%'
    },

    divider: {
        alignSelf: 'stretch',
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        margin: 10
    },
    groupContainer: {
        backgroundColor: '#fff',
        flex: 7,
        marginTop: '10%',
        width: '100%'
    },
    usernameText: {
        paddingBottom: 20
    }
});

const DrawerContent = () => {
    const [state, dispatch] = useContext(Context);

    const signOut = () => {
        dispatch({ type: 'SIGN_OUT' });
        SecureStore.deleteItemAsync('authToken');
        SecureStore.deleteItemAsync('username');
    };

    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.usernameText}>
                    Your username is {state.username}
                </Text>
                <Button title="Sign out" onPress={signOut} />
            </View>
            <View style={styles.divider} />
            <View style={styles.groupContainer}>
                <GroupOverview />
            </View>
            <View style={styles.addGroupContainer}>
                <AddGroupButton />
            </View>
        </View>
    );
};

export default DrawerContent;