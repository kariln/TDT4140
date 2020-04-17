import React from 'react';
import { StyleSheet, View, Text, TextInput } from 'react-native';
import { Button } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import getEnvVars from '../../../environment';

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        backgroundColor: 'white',
        flex: 1,
        paddingTop: '15%'
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
    }
});

// screen thats showing when making a new account
const RegUser = () => {
    const navigation = useNavigation();
    const [username, setUsername] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [password2, checkPassword] = React.useState('');
    const [registerError, setRegisterError] = React.useState({
        email: '',
        username: ''
    });

    const register = async () => {
        setRegisterError({
            email: '',
            username: ''
        });
        const res = await fetch(`${getEnvVars.apiUrl}users/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username,
                password,
                email
            })
        });
        const data = await res.json();
        if (res.status === 400) {
            if (data.email)
                setRegisterError({
                    ...registerError,
                    email: 'This email is already used'
                });
            if (data.username)
                setRegisterError({
                    ...registerError,
                    username: 'This username is already used'
                });
        }
        // status code 201 means row was inserted, account was successfully created
        if (res.status === 201) navigation.navigate('signin');
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                onChangeText={text => setUsername(text)}
                placeholder="Username"
                value={username}
            />
            <View>
                <Text style={{ color: 'red' }}>{registerError.username}</Text>
            </View>
            <TextInput
                style={styles.input}
                onChangeText={text => setEmail(text)}
                placeholder="Email"
                value={email}
            />
            <View>
                <Text style={{ color: 'red' }}>{registerError.email}</Text>
            </View>
            <TextInput
                style={styles.input}
                onChangeText={text => setPassword(text)}
                placeholder="Password, minimum 7 characters"
                value={password}
                secureTextEntry
            />
            <TextInput
                style={styles.input}
                onChangeText={text => checkPassword(text)}
                placeholder="Confirm password"
                value={password2}
                secureTextEntry
            />
            <Button
                onPress={register}
                title="Create user"
                disabled={
                    username === '' ||
                    password === '' ||
                    password !== password2 ||
                    password2 === '' ||
                    password.length < 7
                }
                buttonStyle={{
                    marginTop: 20,
                    padding: 10,
                    paddingLeft: '29%',
                    paddingRight: '29%'
                }}
            />
        </View>
    );
};

export default RegUser;
