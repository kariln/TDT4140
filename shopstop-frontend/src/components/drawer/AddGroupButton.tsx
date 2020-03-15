import React, { useContext } from 'react';
import { Button } from 'react-native';
import { Context } from '../../store/Store';

const AddGroupButton = () => {
    const [, dispatch] = useContext(Context);
    const addGroup = async () => {
        dispatch({
            type: 'TOGGLE_OVERLAY',
            payload: {
                type: 'ADD_GROUP',
                visible: true
            }
        });
    };

    return <Button title="Create group" onPress={addGroup} />;
};

export default AddGroupButton;
