import React, { useState, useContext } from 'react';
import {
    View,
    Image,
    TextInput,
    StyleSheet,
    Text,
    TouchableOpacity
} from 'react-native';
import { Button } from 'react-native-elements';
import * as SecureStore from 'expo-secure-store';
import { useNavigation } from '@react-navigation/native';
import getEnvVars from '../../../environment';
import { Context } from '../../store/Store';

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        backgroundColor: 'white',
        flex: 1,
        paddingTop: '18%'
    },
    image: {
        height: '30%',
        marginBottom: 20,
        resizeMode: 'stretch',
        width: '50%'
    },
    input: {
        backgroundColor: '#fafafa',
        borderColor: 'gray',
        borderRadius: 4,
        borderWidth: 0.1,
        height: 40,
        marginTop: 10,
        paddingLeft: 10,
        width: '80%'
    },
    loginError: {
        padding: 10
    },
    signupContainer: {
        bottom: 0,
        flex: 1,

        justifyContent: 'flex-end'
    },
    signupLink: {
        color: 'blue',
        textDecorationLine: 'underline'
    },
    signupSubContainer: {
        flexDirection: 'row'
    }
});

// screen thats showing when signin in. Default screen when opening app for the first time
const SignIn = () => {
    const navigation = useNavigation();
    const [, dispatch] = useContext(Context);
    const [user, setUser] = useState({
        username: '',
        password: ''
    });
    const [loginError, setLoginError] = useState('');

    const login = async () => {
        setLoginError('');
        const res = await fetch(`${getEnvVars.apiUrl}token/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });
        const data = await res.json();

        // this part runs if the input from the user is valid, and we get a 200 "ok" response in return
        if (res.status === 200) {
            dispatch({ type: 'SIGN_IN', payload: data.token });
            dispatch({
                type: 'SET_USER',
                payload: user.username
            });
            SecureStore.setItemAsync('authToken', data.token);
            SecureStore.setItemAsync('username', user.username); // If we have time, we should probably make an endpoint to get username by token, instead of saving in async storage
        } else setLoginError('The username or password is incorrect'); // this part runs if the input from the user is invalid, and we set a feedback error.
    };

    return (
        <View style={styles.container}>
            <Image
                source={require('../../../assets/Shopstop.png')}
                style={styles.image}
            />
            <TextInput
                style={styles.input}
                placeholder="Username"
                onChangeText={text => setUser({ ...user, username: text })}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                onChangeText={text => setUser({ ...user, password: text })}
                secureTextEntry
            />
            <View style={styles.loginError}>
                <Text style={{ color: 'red' }}>{loginError}</Text>
            </View>
            <Button
                title="Log in"
                disabled={user.username === '' || user.password === ''}
                onPress={() => login()}
                buttonStyle={{
                    padding: 10,
                    paddingLeft: '35%',
                    paddingRight: '35%'
                }}
            />
            <View style={styles.signupContainer}>
                <View style={styles.signupSubContainer}>
                    <Text>Don&apos;t have an account already? </Text>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('register')}
                    >
                        <Text style={styles.signupLink}>Sign up!</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export default SignIn;
