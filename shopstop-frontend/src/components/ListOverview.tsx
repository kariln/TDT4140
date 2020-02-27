import React, { useState, useEffect, useContext } from 'react';
import {
    StyleSheet,
    View,
    FlatList,
    TouchableOpacity,
    Button
} from 'react-native';
import { Icon, Input, Overlay } from 'react-native-elements';
import { GetToken } from '../utils/Utils';
import ListsItem from './ListOverviewItem';
import { Context } from '../store/Store';
import { ListProps } from '../store/StoreTypes';
import getEnvVars from '../../environment';

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        backgroundColor: '#fff',
        flex: 1,
        paddingTop: '10%'
    }
});

const Lists = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [state, dispatch] = useContext(Context);
    const [isVisible, setIsVisible] = useState(false);
    const [newList, setNewList] = useState('');
    if (!state.token)
        GetToken({ username: 'havardp', password: 'alko1233' }).then(token => {
            dispatch({
                type: 'SET_TOKEN',
                payload: token
            });
        });

    const addList = () => {
        dispatch({
            type: 'ADD_LIST',
            payload: { group: 1, name: newList }
        });
        fetch(getEnvVars.apiUrl + 'lists/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Token ' + state.token
            },
            body: JSON.stringify({
                name: newList,
                group: 1
            })
        });
        setIsVisible(false);
    };
    // This useEffect is called whenever the component mounts
    useEffect(() => {
        setIsLoading(true);
        if (state.token)
            fetch(`${getEnvVars.apiUrl}lists/`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Token ' + state.token
                }
            })
                .then(result => result.json())
                .then(data =>
                    dispatch({
                        type: 'SET_LISTS',
                        payload: data
                    })
                )
                .then(() => setIsLoading(false))
                .catch(e => console.log(e));
    }, [dispatch, state.token]);
    if (isLoading) return <></>;
    return (
        <View style={styles.container}>
            <FlatList
                data={state.lists}
                renderItem={({ item }: { item: ListProps }) => {
                    return <ListsItem list={item} />;
                }}
                keyExtractor={item => item.name}
            />
            <TouchableOpacity
                style={{
                    borderWidth: 1,
                    borderColor: 'rgba(0,0,0,0.2)',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginLeft: '50%',
                    width: 70,
                    height: 70,
                    backgroundColor: '#fff',
                    borderRadius: 140
                }}
                onPress={() => setIsVisible(true)}
            >
                <Icon
                    name={'add'}
                    type={'material'}
                    raised
                    size={35}
                    color="#01a699"
                />
            </TouchableOpacity>
            <Overlay
                isVisible={isVisible}
                onBackdropPress={() => setIsVisible(false)}
                height={200}
            >
                <Input
                    label="navn på liste"
                    placeholder="navn"
                    onChangeText={text => setNewList(text)}
                />
                <Button title="legg til liste" onPress={addList} />
            </Overlay>
        </View>
    );
};

export default Lists;
