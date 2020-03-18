import React, { useState, useEffect } from 'react';
import { Asset } from 'expo-asset';
import { AppLoading } from 'expo';
import { MenuProvider } from 'react-native-popup-menu';

// imports of our own components
import Store from './src/store/Store';
import MainStack from './src/navigation/StackNavigation';
import Overlay from './src/components/overlay';

const App = () => {
    // The code below lets us preload the images while still having the splash screen, so we don't have white screens etc while images are loading.
    // see for documentation: https://docs.expo.io/versions/latest/sdk/app-loading/
    const [isReady, setIsReady] = useState(false);
    const cacheResourcesAsync = async () => {
        const images = [
            require('./assets/splash.png'),
            require('./assets/Shopstop.png')
        ];

        const cacheImages = images.map(image => {
            return Asset.fromModule(image).downloadAsync();
        });
        return Promise.all(cacheImages);
    };
    useEffect(() => {
        cacheResourcesAsync().then(() => setIsReady(true));
    });
    if (!isReady) {
        return <AppLoading />;
    }

    return (
        <MenuProvider>
            <Store>
                <>
                    <MainStack />
                    <Overlay />
                </>
            </Store>
        </MenuProvider>
    );
};

export default App;
