import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

// imports of our own components
import DrawerContent from '../components/drawer/DrawerContent';
import SubStack from './SubStackNavigation';

// Instance of the Drawer component that we use in our "Drawercomponent" component.
const Drawer = createDrawerNavigator();

// This is the basic drawer component that says to which page buttons direct etc.
// We only want the drawer available from the main listOverview screen, which is why it is the only sub screen of the drawer.
const DrawerComponent = () => {
    return (
        <Drawer.Navigator drawerContent={() => <DrawerContent />}>
            <Drawer.Screen name="drawer" component={SubStack} />
        </Drawer.Navigator>
    );
};

export default DrawerComponent;
