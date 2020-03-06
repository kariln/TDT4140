import React from 'react';
import { Image, View } from 'react-native';

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
                source={require('../images/ShopStop.png')}
                style={{ width: '50%', height: '25%', resizeMode: 'stretch' }}
            />
        </View>
    );
};

export default Splash;
