import React, { useState, useContext } from 'react';
import { Button, View, Text, StyleSheet } from 'react-native';
import { Input, Overlay } from 'react-native-elements';
import getEnvVars from '../../../environment';
import { Context, initialOverlayState } from '../../store/Store';

const styles = StyleSheet.create({
    errorMessage: {
        color: 'red',
        padding: 10
    }
});

// Overlay when adding a list
const AddList = () => {
    const [state, dispatch] = useContext(Context);
    const [newGroup, setNewGroup] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const addGroup = async () => {
        // Resets error message
        setErrorMessage('');
        const res = await fetch(`${getEnvVars.apiUrl}groups/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Token ${state.authentication.token}`
            },
            body: JSON.stringify({
                name: newGroup
            })
        });
        if (res.status === 400)
            setErrorMessage('That is not a valid group name');

        // 201 respone status means row was inserted into database, call was successfull
        if (res.status === 201) {
            const data = await res.json();
            dispatch({
                type: 'ADD_GROUP',
                payload: data
            });
            dispatch({
                type: 'SET_SELECTEDGROUP',
                payload: data.id
            });

            dispatch({
                type: 'TOGGLE_OVERLAY',
                payload: {
                    type: '',
                    visible: false
                }
            });
        }
    };

    return (
        <Overlay
            isVisible={state.overlay.visible}
            onBackdropPress={() =>
                dispatch({
                    type: 'TOGGLE_OVERLAY',
                    payload: initialOverlayState
                })
            }
            height={200}
        >
            <>
                <Input
                    label="Name of the group"
                    placeholder="Family..."
                    onChangeText={text => setNewGroup(text)}
                    value={newGroup}
                />
                <Text style={styles.errorMessage}>{errorMessage} </Text>
                <View style={{ marginTop: 20, padding: 10 }}>
                    <Button
                        color="#4880b7"
                        title="Create the group"
                        onPress={addGroup}
                    />
                </View>
            </>
        </Overlay>
    );
};

export default AddList;
