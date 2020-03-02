import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// imports of our own components
import ListOverview from '../components/ListOverview';
import HamburgerButton from '../components/HamburgerButton';

import GroupOptions from '../components/GroupOptions';
import GroupInvitation from '../components/GroupInvitation';

const Stack = createStackNavigator();

// if we want to hide the header from the stack navigator, use this as prop in stack.navigator ------>   headerMode="none"
const SubStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="lists"
                component={ListOverview}
                options={{
                    headerTitle: 'Handlelistene mine',
                    headerLeft: () => <HamburgerButton />,
                    headerRight: () => <GroupOptions />
                }}
            />
            <Stack.Screen
                name="invite"
                component={GroupInvitation}
                options={{
                    headerTitle: 'Invite user'
                }}
            />
        </Stack.Navigator>
    );
};

export default SubStack;

// this component basically lets us navigate through screens easily, so we can click a list, and get sent into a new component which shows the list, and easily go back etc.
