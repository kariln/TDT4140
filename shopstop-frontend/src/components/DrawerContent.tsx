import React, { useContext } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { Context } from '../store/Store';
import GroupOverview from './GroupOverview';

const styles = StyleSheet.create({
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
    signOutContainer: {
        flex: 1,
        justifyContent: 'flex-end'
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
            <Text>Ditt brukernavn er {state.username}</Text>
            <View style={styles.divider} />
            <GroupOverview />
            <View style={styles.signOutContainer}>
                <Button title="Sign out" onPress={signOut} />
            </View>
        </View>
    );
};

export default DrawerContent;
