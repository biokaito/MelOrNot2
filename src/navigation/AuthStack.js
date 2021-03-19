import { createStackNavigator } from '@react-navigation/stack'; 
import React from 'react';

import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import FirstScreen from '../screens/FirstScreen'

const Stack = createStackNavigator();

export default function AuthStack(){
    return(
        <Stack.Navigator initialRouteName="FirstScreen" headerMode="none">
            <Stack.Screen name="FirstScreen" component={FirstScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
        </Stack.Navigator>
    )
}