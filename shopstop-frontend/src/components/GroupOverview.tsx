import React from 'react';
import { StyleSheet, View, FlatList, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        backgroundColor: '#fff',
        flex: 1,
        paddingTop: '10%'
    }
});

const GroupOverview = () => {
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
            id: '58694a0f-3da1-471f-bd96-145571e29d73',
            title: 'Third List'
        },
        {
            id: '58694a0f-3da1-471f-bd96-145571e29d74',
            title: 'Third List'
        },
        {
            id: '58694a0f-3da1-471f-bd96-145571e29d75',
            title: 'Third List'
        },
        {
            id: '58694a0f-3da1-471f-bd96-145571e29d76',
            title: 'Third List'
        },
        {
            id: '58694a0f-3da1-471f-bd96-145571e29d77',
            title: 'Third List'
        },
        {
            id: '58694a0f-3da1-471f-bd96-145571e29d78',
            title: 'Third List'
        },
        {
            id: '58694a0f-3da1-471f-bd96-145571e29d79',
            title: 'Third List'
        },
        {
            id: '58694a0f-3da1-471f-bd96-145571e29d721',
            title: 'Third List'
        },
        {
            id: '58694a0f-3da1-471f-bd96-145571e29d722',
            title: 'Third List'
        }
    ];
    const navigation = useNavigation();
    const enterGroup = id => {
        navigation.navigate('lists', { id });
    };
    return (
        <View style={styles.container}>
            <FlatList
                data={DATA}
                renderItem={({ item }) => (
                    <Button
                        title={item.title}
                        onPress={() => enterGroup(item.id)}
                    />
                )}
                keyExtractor={item => item.id}
            />
        </View>
    );
};

export default GroupOverview;
