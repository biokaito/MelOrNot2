import React from 'react';
import {createAppContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Ionicons} from '@expo/vector-icons';

import BottomTabHome from '../screens/patients/BottomTabHome';
import BottomTabNews from '../screens/patients/BottomTabNews';
import BottomTabCamera from '../screens/patients/BottomTabCamera';
import BottomTabChat from '../screens/patients/BottomTabChat';
import BottomTabUser from '../screens/patients/BottomTabUser';

const tabNavigator = createBottomTabNavigator({
    Home: createStackNavigator({
        Home: BottomTabHome,
    }),
    News: createStackNavigator({
        News: BottomTabNews
    }),
    Camera: createStackNavigator({
        Camera: BottomTabCamera
    }),
    Chat: createStackNavigator({
        Chat: BottomTabChat
    }),
    User: createStackNavigator({
        User: BottomTabUser
    })
},
{
    defaultNavigationOptions: ({navigation}) => ({
        tabBarIcon: ({focused, horizontal, tintColor})=>{
            const{routeName} = navigation.state
            let IconComponent = Ionicons
            let iconName 
            if(routeName === 'Home'){
              iconName = focused ? 'ios-home' : 'md-home'
            }else if(routeName === 'News'){
              iconName = focused? 'ios-tv' : 'md-tv'
            }else if(routeName === 'Camera'){
              iconName = focused? 'ios-camera' : 'md-camera'
            }else if(routeName === 'Chat'){
              iconName = focused? 'ios-chatboxes' : 'ios-chatbubbles'
            }else if(routeName === 'User'){
              iconName = focused? 'ios-body' : 'md-body'
            }
            if(focused)
              {
                return <IconComponent name = {iconName} size ={30} color = {tintColor} ></IconComponent>
              }
              else{
                return <IconComponent name = {iconName} size ={25} color = {tintColor} ></IconComponent>
              }
          }
    })
},
{
    tabBarOptions:{
    activeTintColor: '#fff',
    activeBackgroundColor: '#f4511e',
    keyboardHidesTabBar: false,
    tabStyle:{
      backgroundColor: '#f4511e'
    },
    labelStyle:{
      fontSize: 12,
    }
  }
}
)
const BottomTabPatients = createAppContainer(tabNavigator)
export default BottomTabPatients;