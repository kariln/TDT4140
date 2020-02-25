import React from 'react';
import { MenuProvider } from 'react-native-popup-menu';

// imports of our own components
import Store from './src/store/Store';
import MainStack from './src/navigation/StackNavigation';

const App = () => {
    return (
        <MenuProvider>
            <Store>
                <MainStack />
            </Store>
        </MenuProvider>
    );
};

export default App;
