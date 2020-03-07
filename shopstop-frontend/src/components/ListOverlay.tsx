import React, { useState, useContext, useEffect } from 'react';
import { Button, View } from 'react-native';
import { Input, Overlay } from 'react-native-elements';
import getEnvVars from '../../environment';
import { Context, initialOverlayState } from '../store/Store';
import { ListProps } from '../store/StoreTypes';

const ListOverlay = () => {
    const [state, dispatch] = useContext(Context);
    const [newList, setNewList] = useState('');

    const addList = () => {
        // .then chaining dispatch so the id for the new list is made on the backend, and then we update the frontend with it afterwards.
        fetch(`${getEnvVars.apiUrl}lists/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Token ${state.authentication.token}`
            },
            body: JSON.stringify({
                name: newList,
                group: state.selectedGroup
            })
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                dispatch({
                    type: 'ADD_LIST',
                    payload: data
                });
            });
        dispatch({
            type: 'TOGGLE_LISTOVERLAY',
            payload: initialOverlayState
        });
    };

    const changeList = () => {
        dispatch({
            type: 'EDIT_LIST',
            payload: {
                group: state.selectedGroup,
                name: newList,
                id: state.listOverlay.id
            }
        });
        fetch(`${getEnvVars.apiUrl}lists/${state.listOverlay.id}/`, {
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
            type: 'TOGGLE_LISTOVERLAY',
            payload: initialOverlayState
        });
    };

    // sets the initial value of the name field to the name of the list if the user is editing the list.
    useEffect(() => {
        let thisList = state.lists.find(
            (list: ListProps) => list.id === state.listOverlay.id
        );
        if (state.listOverlay.type === 'change') setNewList(thisList.name);
    }, [
        state.listOverlay.id,
        state.listOverlay.type,
        state.listOverlay.visible,
        state.lists
    ]);

    return (
        <Overlay
            isVisible={state.listOverlay.visible}
            onBackdropPress={() =>
                dispatch({
                    type: 'TOGGLE_LISTOVERLAY',
                    payload: initialOverlayState
                })
            }
            height={200}
        >
            <>
                {state.listOverlay.type === 'add' && (
                    <>
                        <Input
                            label="Navnet på listen"
                            placeholder="daglighandel..."
                            onChangeText={text => setNewList(text)}
                            value={newList}
                        />
                        <View style={{ marginTop: 40, padding: 20 }}>
                            <Button
                                color="#4880b7"
                                title="Legg til liste"
                                onPress={addList}
                            />
                        </View>
                    </>
                )}
                {state.listOverlay.type === 'change' && (
                    <>
                        <Input
                            label="Endre navnet på listen"
                            placeholder="daglighandel..."
                            onChangeText={text => setNewList(text)}
                            value={newList}
                        />
                        <View style={{ marginTop: 40, padding: 20 }}>
                            <Button
                                color="#4880b7"
                                title="endre listen"
                                onPress={changeList}
                            />
                        </View>
                    </>
                )}
            </>
        </Overlay>
    );
};

export default ListOverlay;
