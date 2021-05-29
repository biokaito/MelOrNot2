import { createStackNavigator } from "@react-navigation/stack";
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import React, { useEffect } from 'react';

import ListDoctorScreen from './BottomTabChat';
import ChatScreen from './ChatScreen';
const stack = createStackNavigator();
const ChatNavigator = ({ navigation, route }) => {
    useEffect(()=>{
        const routeName = getFocusedRouteNameFromRoute(route)
        if (routeName === "ChatScreen"){
            navigation.setOptions({tabBarVisible: false});
        }else {
            navigation.setOptions({tabBarVisible: true});
        }
    }, [navigation, route])
    return(
        <stack.Navigator 
            headerMode="none"
            initialRouteName="ListDoctorScreen"
        >
            <stack.Screen 
                name="ListDoctorScreen" 
                component={ListDoctorScreen}
                />
            <stack.Screen 
                name="ChatScreen" 
                component={ChatScreen}       
                />
        </stack.Navigator>
    )
}
export default ChatNavigator;