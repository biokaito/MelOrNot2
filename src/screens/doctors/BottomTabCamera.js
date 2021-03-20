import React,{useState,useEffect, useContext} from 'react';
import {StyleSheet, View, Text } from 'react-native';
import {Title} from 'react-native-paper';
import { firebase } from '../../firebase';
import AsyncStorage from '@react-native-async-storage/async-storage'

import FormButton from '../../components/FormButton';
import {AuthContext} from '../../navigation/AuthProvider';

export default function HomeScreen(){
    const {logout, user} = useContext(AuthContext);
    const [name, setName] = useState("");
    // useEffect(()=>{
    //     const user =  firebase.auth().currentUser
    //     if (user.displayName){
    //     setName(user.displayName)
    //     }
    //     else{
            
    //     }
    // })
    return(
        <View style={styles.container}>
            <Title>Welcome Doctor Camera <Text>{user}</Text></Title>
            <FormButton 
                modeValue="contained" 
                title="Logout" 
                onPress={()=>{
                    logout()
            }} />
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: '#f5f5f5',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})