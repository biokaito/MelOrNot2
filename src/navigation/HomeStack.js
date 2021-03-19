import { createStackNavigator } from "@react-navigation/stack";
import React from 'react';

import HomeScreen from '../screens/HomeScreen';
const Stack = createStackNavigator();

export default function HomeStack(){
    return(
        <Stack.Navigator headerMode="none">
            <Stack.Screen component={HomeScreen} name="Home" />
        </Stack.Navigator>
    )
}