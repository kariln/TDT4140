import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// imports of our own components
import ListOverview from '../screens/ListOverviewScreen';
import SingleList from '../screens/SingleListScreen';

const Stack = createStackNavigator();

// if we want to hide the header from the stack navigator, use this as prop in stack.navigator ------>   headerMode="none"
const MyStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="lists"
                component={ListOverview}
                options={{
                    title: 'Oversikt over hanndlelistene',
                    headerStyle: {
                        backgroundColor: '#add8e6'
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontWeight: 'bold'
                    }
                }}
            />
            <Stack.Screen name="list" component={SingleList} />
        </Stack.Navigator>
    );
};

export default MyStack;

// this component basically lets us navigate through screens easily, so we can click a list, and get sent into a new component which shows the list, and easily go back etc.