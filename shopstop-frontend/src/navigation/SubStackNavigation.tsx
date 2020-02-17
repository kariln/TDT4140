import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// imports of our own components
import ListOverview from '../screens/ListOverviewScreen';

const Stack = createStackNavigator();

// if we want to hide the header from the stack navigator, use this as prop in stack.navigator ------>   headerMode="none"
const SubStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="lists"
                component={ListOverview}
                options={{ title: 'Handlelistene mine' }}
            />
        </Stack.Navigator>
    );
};

export default SubStack;

// this component basically lets us navigate through screens easily, so we can click a list, and get sent into a new component which shows the list, and easily go back etc.
