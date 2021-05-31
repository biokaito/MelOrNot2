import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons  } from '@expo/vector-icons';
import React from 'react';

import HomeNavigator from '../screens/doctors/HomeNavigator';
import ChatNavigator from '../screens/doctors/ChatNavigator';
import CameraNavigator from '../screens/doctors/CameraNavigator';
import NewsScreen from '../screens/doctors/BottomTabNews';
import UserScreen from '../screens/doctors/BottomTabUser';
const Stack = createStackNavigator();

export default function HomeStack(){
    const Tab = createBottomTabNavigator();
    return(
        <Tab.Navigator
            initialRouteName="Home"
            tabBarOptions={{
                activeTintColor: '#55b3b1',
                activeBackgroundColor: '#fff',
                keyboardHidesTabBar: false,
                tabStyle:{
                 borderRadius: 30,
                 backgroundColor: '#fff',
                 marginBottom: -20
                },
                labelStyle:{
                 fontSize: 14,
                },
                style:{
                    backgroundColor: '#fff',
                    borderRadius: 30,
                    position: 'absolute',
                    bottom: 60,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderWidth: 1,
                    borderColor: 'gray'
                    
                }
            }}
        >
            <Tab.Screen 
                name="Home" 
                component={HomeNavigator}
                options={{
                    tabBarLabel: 'Repo',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="document-attach" color={color} size={30} />
                    ),
                }}
            />
            <Tab.Screen 
                name="Chat" 
                component={ChatNavigator} 
                options={{
                    tabBarLabel: 'Chat',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="ios-chatbubbles" color={color} size={30} />
                    ),
                }}
            />            
            <Tab.Screen 
                name="Camera" 
                component={CameraNavigator} 
                options={{
                    tabBarLabel: 'Camera',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="ios-camera" color={color} size={30} />
                    ),
                }}
            />
            <Tab.Screen 
                name="News" 
                component={NewsScreen} 
                options={{
                    tabBarLabel: 'News',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="ios-tv" color={color} size={30} />
                    ),
                }}
            />
            <Tab.Screen 
                name="User" 
                component={UserScreen} 
                options={{
                    tabBarLabel: 'User',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="ios-body" color={color} size={30} />
                    ),
                }}
            />
      </Tab.Navigator>
    )
}