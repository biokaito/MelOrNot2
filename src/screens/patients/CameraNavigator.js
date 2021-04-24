import { createStackNavigator } from "@react-navigation/stack";
import React from 'react';

import CameraScreen from './BottomTabCamera';
import RepositoryScreen from './Repository';
const stack = createStackNavigator();
const CameraNavigator = () => {
    return(
        <stack.Navigator 
            headerMode="none"
            initialRouteName="CameraScreen"
        >
            <stack.Screen 
                options={{
                    headerTitle: "lele"
                }}
                name="CameraScreen" 
                component={CameraScreen}
                />
            <stack.Screen 
                name="RepositoryScreen" 
                component={RepositoryScreen}
                />
        </stack.Navigator>
    )
}
export default CameraNavigator;