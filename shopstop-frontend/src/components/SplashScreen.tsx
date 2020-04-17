import React from 'react';
import { Image, View } from 'react-native';

// component that shows the splash screen when trying to fetch token from expo storage at app load
const Splash = () => {
    return (
        <View
            style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'white'
            }}
        >
            <Image
                source={require('../../assets/splash.png')}
                style={{ width: '100%', height: '100%', resizeMode: 'cover' }}
            />
        </View>
    );
};

export default Splash;
