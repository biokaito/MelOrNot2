import { createStackNavigator } from "@react-navigation/stack";
import React from 'react';

import HomeScreen from './BottomTabHome';
import MedicalRecord from './MedicalRecord';
import DetailRecord from './DetailRecord';
const stack = createStackNavigator();
const HomeNavigator = () => {
    return(
        <stack.Navigator 
            headerMode="none"
            initialRouteName="Home"
        >
            <stack.Screen 
                name="Home" 
                component={HomeScreen}
                />
            <stack.Screen name="MedicalRecord" component={MedicalRecord}/>
            <stack.Screen name="DetailRecord" component={DetailRecord}/>
        </stack.Navigator>
    )
}
export default HomeNavigator;