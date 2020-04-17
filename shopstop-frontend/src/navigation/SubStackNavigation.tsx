import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// imports of our own components
import ListOverview from '../components/listOverview/ListOverview';
import HamburgerButton from '../components/HamburgerButton';

import GroupOptions from '../components/groups/GroupOptions';
import GroupInvitation from '../components/groups/GroupInvitation';

const Stack = createStackNavigator();

// We have this stack navigation inside the drawer navigation, since we only want the drawer available from the "main" screen. and not inside stacks.
const SubStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="lists"
                component={ListOverview}
                options={{
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
