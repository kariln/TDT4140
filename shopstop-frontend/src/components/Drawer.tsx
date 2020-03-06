import React, { useContext } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { Context } from '../store/Store';

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        backgroundColor: 'white',
        flex: 1,
        paddingTop: '18%'
    },

    signOutContainer: {
        flex: 1,
        justifyContent: 'flex-end'
    }
});

const CustomDrawerContent = () => {
    const [, dispatch] = useContext(Context);

    const signOut = () => {
        dispatch({ type: 'SIGN_OUT' });
        SecureStore.deleteItemAsync('authToken');
        SecureStore.deleteItemAsync('username');
    };

    return (
        <View style={styles.container}>
            <Text>Her kan jeg lage custom ting til drawer</Text>
            <View style={styles.signOutContainer}>
                <Button title="Sign out" onPress={signOut} />
            </View>
        </View>
    );
};

export default CustomDrawerContent;
