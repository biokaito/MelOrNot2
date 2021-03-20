import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';

import HomeScreen from '../screens/patients/BottomTabHome';
import ChatScreen from '../screens/patients/BottomTabChat';
import CameraScreen from '../screens/patients/BottomTabCamera';
import NewsScreen from '../screens/patients/BottomTabNews';
import UserScreen from '../screens/patients/BottomTabUser';
const Stack = createStackNavigator();

export default function HomeStack(){
    const Tab = createBottomTabNavigator();
    return(
        <Tab.Navigator>
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Chat" component={ChatScreen} />            
            <Tab.Screen name="Camera" component={CameraScreen} />
            <Tab.Screen name="News" component={NewsScreen} />
            <Tab.Screen name="User" component={UserScreen} />
      </Tab.Navigator>
    )
}