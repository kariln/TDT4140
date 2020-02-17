import React from 'react';
import { MenuProvider } from 'react-native-popup-menu';

// imports of our own components
import MainStack from './src/navigation/StackNavigation';

const App = () => {
    return (
        <MenuProvider>
            <MainStack />
        </MenuProvider>
    );
};

export default App;
