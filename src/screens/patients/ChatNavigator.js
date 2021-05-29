import { createStackNavigator } from "@react-navigation/stack";
import React from 'react';

import ListDoctorScreen from './BottomTabChat';
import ChatScreen from './ChatScreen';
const stack = createStackNavigator();
const ChatNavigator = () => {
    return(
        <stack.Navigator 
            headerMode="none"
            initialRouteName="ListDoctorScreen"
        >
            <stack.Screen 
                options={{
                    headerTitle: "lele"
                }}
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