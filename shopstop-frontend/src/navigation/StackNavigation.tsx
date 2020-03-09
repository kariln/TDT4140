import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { NavigationContainer } from '@react-navigation/native';

// imports of our own components
import SingleList from '../screens/SingleListScreen';
import MyDrawer from './DrawerNavigation';
import RegUser from '../screens/RegisterScreen';

const Stack = createStackNavigator();

const MainStack = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator headerMode="screen">
                <Stack.Screen
                    name="drawer"
                    component={MyDrawer}
                    options={{ headerShown: false }}
                />
                <Stack.Screen name="list" component={SingleList} />
                <Stack.Screen name="Registrer bruker" component={RegUser} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default MainStack;

// this component basically lets us navigate through screens easily, so we can click a list, and get sent into a new component which shows the list, and easily go back etc.
