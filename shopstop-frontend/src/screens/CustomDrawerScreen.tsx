import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import GroupOverview from '../components/GroupOverview';

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingTop: '40%',
        flex: 1
    },
    divider: {
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        alignSelf: 'stretch',
        margin: 10
    }
});

const CustomDrawerContent = () => {
    return (
        <View style={styles.container}>
            <Text>Enten profil eller bilde her</Text>
            <View style={styles.divider} />
            <GroupOverview />
        </View>
    );
};

export default CustomDrawerContent;
