import React from 'react';
import { View } from 'react-native';
import { Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';

// hamburger button to open drawer on top navigation
const HamburgerButton = () => {
    const navigation = useNavigation<any>();
    return (
        <View style={{ padding: 20 }}>
            <Icon name="menu" onPress={() => navigation.openDrawer()} />
        </View>
    );
};

export default HamburgerButton;
