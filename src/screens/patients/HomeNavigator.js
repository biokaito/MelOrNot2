import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons  } from '@expo/vector-icons';
import React from 'react';

import HomeScreen from '../patients/BottomTabHome';
import Cana from '../../questions/Cana'
import Howis from '../../questions/Howis'
import Howoften from '../../questions/Howoften'
import Whatskin from '../../questions/Whatskin'
import Whyshould from '../../questions/Whyshould'
const stack = createStackNavigator();
const HomeNavigator = () => {
    return(
        <stack.Navigator 
            headerMode="none"
            initialRouteName="Home"
        >
            <stack.Screen name="Home" component={HomeScreen}/>
            <stack.Screen name="Can" component={Cana} headerMode/>
            <stack.Screen name="How" component={Howis}/>
            <stack.Screen name="How Often" component={Howoften}/>
            <stack.Screen name="What" component={Whatskin}/>
            <stack.Screen name="Why" component={Whyshould}/>
        </stack.Navigator>
    )
}
export default HomeNavigator;