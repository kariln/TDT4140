import * as SecureStore from 'expo-secure-store';
import getEnvVars from '../../environment';

export const GetToken = async ({
    username,
    password
}: {
    username: string;
    password: string;
}) => {
    const token = await SecureStore.getItemAsync('authToken');
    try {
        if (token) return token;
        return fetch(`${getEnvVars.apiUrl}token/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        })
            .then(response => response.json())
            .then(data => {
                SecureStore.setItemAsync('authToken', data.token);
                return data.token;
            });
    } catch (e) {
        console.log(e);
    }
    return token;
};
