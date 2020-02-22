import React from 'react';
import getEnvVars from '../../environment.js';
import * as SecureStore from 'expo-secure-store';

// Hook for getting items from the database
const useGetData = ({ path }: { path: string }) =>
    fetch(getEnvVars.apiUrl + path + '/').then(response => response.json());

// Hook for adding data
/*const useAddData = ({
    path,
    id,
    token,
    data
}: {
    path: string;
    id: number;
    token: string;
    data: object;
}) => {
    let urlId = id ? id : '';
    return fetch(getEnvVars.apiUrl + path + '/' + urlId, {
        method: 'POST',
        headers: {
            Authorization: 'Token ' + token
        },
        body: JSON.stringify(data)
    }).then(response => response.json());
};*/

/*
// Hook for deleting items
const useDeleteData = ({ path, id }: { path: string; id: number }) =>
    fetch(getEnvVars.apiUrl + path + id + '/', {
        method: 'DELETE'
    }).then(response => response.json());

const useChangeData = ({
    path,
    id,
    data
}: {
    path: string;
    id: number;
    data: object;
}) => {
    let urlId = id ? id : '';
    return fetch(getEnvVars.apiUrl + path + '/' + urlId, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(json => console.log(json));
};*/

// async function that returns the token if it exists in securestorage, else makes the POST call to get the token, then sets it in securestorage, then returns it
const useToken = async ({
    username,
    password
}: {
    username: string;
    password: string;
}) => {
    try {
        const token = await SecureStore.getItemAsync('authToken');
        if (token) {
            return token;
        } else {
            return fetch('https://staging.shopstop.xyz/token/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username: username, password: password })
            })
                .then(response => response.json())
                .then(data => {
                    SecureStore.setItemAsync('authToken', data.token);
                    return data.token;
                });
        }
    } catch (e) {
        console.log(e);
    }
};

export { useToken, useGetData };
