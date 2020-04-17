import React, { useState, useContext, useEffect } from 'react';
import { Button, View } from 'react-native';
import { Input, Overlay } from 'react-native-elements';
import getEnvVars from '../../../environment';
import { Context, initialOverlayState } from '../../store/Store';
import { ListProps } from '../../store/StoreTypes';

// overlay when editing a list
const EditList = () => {
    const [state, dispatch] = useContext(Context);
    const [newList, setNewList] = useState('');

    const changeList = () => {
        dispatch({
            type: 'EDIT_LIST',
            payload: {
                group: state.selectedGroup,
                name: newList,
                id: state.overlay.id
            }
        });
        fetch(`${getEnvVars.apiUrl}lists/${state.overlay.id}/`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Token ${state.authentication.token}`
            },
            body: JSON.stringify({
                name: newList
            })
        });
        dispatch({
            type: 'TOGGLE_OVERLAY',
            payload: initialOverlayState
        });
    };

    // sets the initial value of the name field to the name of the list if the user is editing the list.
    useEffect(() => {
        const thisList = state.lists.find(
            (list: ListProps) => list.id === state.overlay.id
        );
        setNewList(thisList.name);
    }, [state.overlay.id, state.overlay.visible, state.lists]);

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
                        title="Change the list"
                        onPress={changeList}
                    />
                </View>
            </>
        </Overlay>
    );
};

export default EditList;
