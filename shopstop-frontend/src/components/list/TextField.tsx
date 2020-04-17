import React, { useState, useContext } from 'react';
import {
    Alert,
    StyleSheet,
    View,
    TextInput,
    TouchableHighlight
} from 'react-native';
import { Icon } from 'react-native-elements';
import getEnvVars from '../../../environment';
import { Context } from '../../store/Store';

const styles = StyleSheet.create({
    input: {
        alignSelf: 'center',
        backgroundColor: '#ffffff',
        borderColor: 'lightblue',
        borderRadius: 6,
        color: '#555555',
        fontSize: 20,
        height: '80%',
        paddingLeft: 8,
        width: '100%'
    },
    inputContainer: {
        alignItems: 'center',
        alignSelf: 'center',
        backgroundColor: 'lightblue',
        flexDirection: 'row',
        height: 50,
        justifyContent: 'center'
    },
    nameContainer: {
        flex: 9,
        paddingLeft: 10,
        width: '100%'
    },
    quantityContainer: {
        flex: 3,
        paddingLeft: 10,
        width: '100%'
    }
});

// Component where a user can create a new listitem
const TextField = () => {
    const [saveData, setSaveData] = useState('');
    const [saveQuantity, setSaveQuantity] = useState(1);
    const [state, dispatch] = useContext(Context);

    const addListItem = () => {
        if (
            saveData !== '' &&
            saveData !== undefined &&
            !isNaN(Number(saveQuantity))
        ) {
            fetch(`${getEnvVars.apiUrl}list-items/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Token ${state.authentication.token}`
                },
                body: JSON.stringify({
                    name: saveData,
                    quantity: saveQuantity,
                    bougth: false,
                    list: state.selectedList
                })
            })
                .then(response => response.json())
                .then(data =>
                    dispatch({
                        type: 'ADD_LISTITEM',
                        payload: data
                    })
                );
            // resets the fields when a new item is created
            setSaveData('');
            setSaveQuantity(1);
        } else {
            // if no valid input, give user info
            Alert.alert(
                'Whops!',
                'You forgot to enter the name of the item!',
                [{ text: 'OK' }],
                { cancelable: false }
            );
        }
    };
    return (
        <View style={styles.inputContainer}>
            <View style={styles.nameContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Item..."
                    onChangeText={text => setSaveData(text)}
                    value={saveData}
                />
            </View>
            <View style={styles.quantityContainer}>
                <TextInput
                    keyboardType="numeric"
                    style={styles.input}
                    placeholder="1..."
                    onChangeText={text =>
                        setSaveQuantity(Number(text.replace(/[^0-9]/g, '')))
                    }
                    value={String(saveQuantity)}
                />
            </View>
            <View style={{ flex: 2 }}>
                <TouchableHighlight
                    underlayColor="#4e4273"
                    onPress={() => addListItem()}
                >
                    <Icon size={40} name="add-circle" color="#ffffff" />
                </TouchableHighlight>
            </View>
        </View>
    );
};

export default TextField;
