import React from 'react';
import {
    StyleSheet,
    View,
    FlatList,
    Text,
    TouchableOpacity
} from 'react-native';
import { Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';

import ListsItem from './ListOverviewItem';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        paddingTop: '20%'
    }
});

const Lists = () => {
    const navigation = useNavigation();
    // Mock data of the lists, with a name and an id
    const DATA = [
        {
            id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
            title: 'First List'
        },
        {
            id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
            title: 'Second List'
        },
        {
            id: '58694a0f-3da1-471f-bd96-145571e29d72',
            title: 'Third List'
        }
    ];
    return (
        <View style={styles.container}>
            <Text>Her er listene, du kan trykke inn på dem</Text>
            <FlatList
                data={DATA}
                renderItem={({ item }) => (
                    <ListsItem id={item.id} title={item.title} />
                )}
                keyExtractor={item => item.id}
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
                onPress={() => navigation.navigate('addList')}
            >
                <Icon
                    name={'add'}
                    type={'material'}
                    raised
                    size={35}
                    color="#01a699"
                />
            </TouchableOpacity>
        </View>
    );
};

export default Lists;
