import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons  } from '@expo/vector-icons';
import React from 'react';


import ChatScreen from '../screens/patients/BottomTabChat';
import CameraScreen from '../screens/patients/BottomTabCamera';
import NewsScreen from '../screens/patients/BottomTabNews';
import UserScreen from '../screens/patients/BottomTabUser';
import HomeNavigator from '../screens/patients/HomeNavigator'

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
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="ios-home" color={color} size={30} />
                    ),
                }}
                
            />
            <Tab.Screen 
                name="Chat" 
                component={ChatScreen} 
                options={{
                    tabBarLabel: 'Chat',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="ios-chatbubbles" color={color} size={30} />
                    ),
                }}
            />            
            <Tab.Screen 
                name="Camera" 
                component={CameraScreen} 
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