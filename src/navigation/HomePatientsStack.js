import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons  } from '@expo/vector-icons';
import React from 'react';

import ChatNavigator from '../screens/patients/ChatNavigator';
import CameraNavigator from '../screens/patients/CameraNavigator';
import NewsScreen from '../screens/patients/BottomTabNews';
import UserScreen from '../screens/patients/BottomTabUser';
import HomeNavigator from '../screens/patients/HomeNavigator'

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
                    bottom: 30,
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
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="ios-home" color={color} size={30} />
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
                    // tabBarVisible: false
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