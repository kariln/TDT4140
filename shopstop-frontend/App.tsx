import React, { useState, useEffect } from 'react';
import { Asset } from 'expo-asset';
import { AppLoading } from 'expo';
// MenuProvider is needed at the top level so we can have popups in our app, used for example when editing lists
import { MenuProvider } from 'react-native-popup-menu';

// State Store using react context and reducer
import Store from './src/store/Store';
// MainStack is a navigation component
import MainStack from './src/navigation/StackNavigation';
// Overlay can be anywhere in the DOM tree, and it's visibility is controlled from the state
import Overlay from './src/components/overlay';

// This is the entry point to the application, the top of the DOM
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
