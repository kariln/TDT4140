import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

// imports of our own components
import CustomDrawerContent from '../screens/CustomDrawerScreen';
import MyStack from './StackNavigation';

// Instance of the Drawer component that we use in our "Drawercomponent" component.
const Drawer = createDrawerNavigator();

// This is the basic drawer component that says to which page buttons direct etc.
// we can add more drawer.screen, which lets us navigate to the screens from the drawer, can for example be a list of groups in the drawer menu etc.
const DrawerComponent = () => {
    return (
        <NavigationContainer>
            <Drawer.Navigator
                initialRouteName="Home"
                drawerContent={CustomDrawerContent}
            >
                <Drawer.Screen name="Home" component={MyStack} />
            </Drawer.Navigator>
        </NavigationContainer>
    );
};

export default DrawerComponent;

// this is mostly using react-navigation components, which makes it easy to handle the drawer/sidebar, aswell as navigation between screens.
