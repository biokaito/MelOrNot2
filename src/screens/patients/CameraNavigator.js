import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {Button,Text} from 'react-native';
import { Ionicons  } from '@expo/vector-icons';
import React from 'react';

import FormButton from '../../components/FormButton';

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