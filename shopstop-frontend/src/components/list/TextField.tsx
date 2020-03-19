import React, { useState, useContext } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    TouchableHighlight,
    Dimensions
} from 'react-native';
import getEnvVars from '../../../environment';
import { Context } from '../../store/Store';

const styles = StyleSheet.create({
    input: {
        alignSelf: 'center',
        backgroundColor: '#ffffff',
        borderColor: 'lightblue',
        borderRadius: 6,
        color: '#555555',
        height: '80%',
        paddingLeft: 8,
        width: Dimensions.get('window').width - 70
    },
    inputContainer: {
        alignItems: 'center',
        backgroundColor: 'lightblue',
        flexDirection: 'row',
        height: 75
    },
    sendContainer: {
        paddingRight: 10
    },
    sendLabel: {
        color: '#ffffff',
        fontSize: 15
    },
    textContainer: {
        flex: 1
    }
});

const TextField = () => {
    const [saveData, setSaveData] = useState('');
    const [state, dispatch] = useContext(Context);

    const addListItem = () => {
        fetch(`${getEnvVars.apiUrl}list-items/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Token ${state.authentication.token}`
            },
            body: JSON.stringify({
                name: saveData,
                quantity: 1,
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
        setSaveData('');
    };

    return (
        <View style={styles.inputContainer}>
            <View style={styles.textContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Milk..."
                    onChangeText={text => setSaveData(text)}
                    clearButtonMode="always"
                    value={saveData}
                />
            </View>
            <View style={styles.sendContainer}>
                <TouchableHighlight
                    underlayColor="#4e4273"
                    onPress={() => addListItem()}
                >
                    <Text style={styles.sendLabel}>Add</Text>
                </TouchableHighlight>
            </View>
        </View>
    );
};

export default TextField;
