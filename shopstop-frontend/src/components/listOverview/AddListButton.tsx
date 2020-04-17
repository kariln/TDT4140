import React, { useContext } from 'react';
import { TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import { Context } from '../../store/Store';

// Button component when creating a new list
const AddListButton = () => {
    const [, dispatch] = useContext(Context);
    return (
        <>
            <TouchableOpacity
                style={{
                    borderWidth: 1,
                    borderColor: 'rgba(0,0,0,0.2)',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: 20,
                    marginLeft: '50%',
                    width: 70,
                    height: 70,
                    backgroundColor: '#fff',
                    borderRadius: 35
                }}
                onPress={() =>
                    dispatch({
                        type: 'TOGGLE_OVERLAY',
                        payload: {
                            visible: true,
                            type: 'ADD_LIST',
                            id: null
                        }
                    })
                }
            >
                <Icon
                    name="add"
                    type="material"
                    raised
                    size={35}
                    color="#4880b7"
                />
            </TouchableOpacity>
        </>
    );
};

export default AddListButton;
