import React, { useState, useContext } from 'react';
import { Button, View } from 'react-native';
import { Input, Overlay } from 'react-native-elements';
import getEnvVars from '../../../environment';
import { Context, initialOverlayState } from '../../store/Store';

// overlay when adding a new list
const AddList = () => {
    const [state, dispatch] = useContext(Context);
    const [newList, setNewList] = useState('');

    const addList = async () => {
        const res = await fetch(`${getEnvVars.apiUrl}lists/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Token ${state.authentication.token}`
            },
            body: JSON.stringify({
                name: newList,
                group: state.selectedGroup
            })
        });

        if (res.status === 201) {
            const data = await res.json();

            dispatch({
                type: 'ADD_LIST',
                payload: data
            });
        }

        dispatch({
            type: 'TOGGLE_OVERLAY',
            payload: initialOverlayState
        });
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
                    label="Name of the shopping list"
                    placeholder="Daily shopping..."
                    onChangeText={text => setNewList(text)}
                    value={newList}
                />
                <View style={{ marginTop: 40, padding: 20 }}>
                    <Button
                        color="#4880b7"
                        title="Make the list"
                        onPress={addList}
                    />
                </View>
            </>
        </Overlay>
    );
};

export default AddList;
