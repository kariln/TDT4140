import React, { useContext, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';
import { Context } from '../store/Store';

// imports of our own components
import List from '../components/List';
import MyDrawer from './DrawerNavigation';
import RegUser from '../screens/RegisterScreen';
import Splash from '../components/SplashScreen';
import SignIn from '../components/SignIn';
import SignUp from '../components/Signup';
import RegisterOverview from '../components/RegisterOverview';


const Stack = createStackNavigator();

const MainStack = () => {
    const [state, dispatch] = useContext(Context);

    useEffect(() => {
        const initAuthToken = async () => {
            const authToken = await SecureStore.getItemAsync('authToken');
            const username = await SecureStore.getItemAsync('username');
            if (authToken) {
                dispatch({ type: 'RESTORE_TOKEN', payload: authToken });
                dispatch({
                    type: 'SET_USER',
                    payload: username
                });
            } else dispatch({ type: 'SIGN_OUT' }); // We're not actually signing out, but we only want to set isloading to false, so this dispatch works
        };

        initAuthToken();
    }, [dispatch]);

    // While we're trying to get the token from expo secure storage, we display splash screen
    if (state.authentication.isLoading) return <Splash />;

    // What's happening here is essentially we have protected and unprotected screens. If no token exists, the only available screens are signin/signup
    return (
        <NavigationContainer>
            <Stack.Navigator headerMode="screen">
                {state.authentication.token === null ? (
                    <>
                        <Stack.Screen
                            name="signin"
                            component={SignIn}
                            options={{
                                headerShown: false,
                                animationTypeForReplace: state.authentication
                                    .isSignOut
                                    ? 'pop'
                                    : 'push'
                            }}
                        />
                        <Stack.Screen
                        name="register"
                        component={RegUser}
                        options={{
                            headerShown: false
                        }}
                        />
                    </>
                ) : (
                    <>
                        <Stack.Screen
                            name="drawer"
                            component={MyDrawer}
                            options={{ headerShown: false }}
                        />
                        <Stack.Screen name="list" component={List} />
                    </>
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default MainStack;

// this component basically lets us navigate through screens easily, so we can click a list, and get sent into a new component which shows the list, and easily go back etc.
