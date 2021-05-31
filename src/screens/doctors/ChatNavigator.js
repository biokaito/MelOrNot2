import { createStackNavigator } from "@react-navigation/stack";
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import React, { useEffect } from 'react';

import ListPatientsScreen from './BottomTabChat';
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
            initialRouteName="ListPatientsScreen"
        >
            <stack.Screen 
                name="ListPatientsScreen" 
                component={ListPatientsScreen}
                />
            <stack.Screen 
                name="ChatScreen" 
                component={ChatScreen}       
                />
        </stack.Navigator>
    )
}
export default ChatNavigator;