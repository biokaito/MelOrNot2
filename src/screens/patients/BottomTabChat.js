import React,{useState,useEffect, useContext} from 'react';
import {StyleSheet, View, Text } from 'react-native';
import {Title} from 'react-native-paper';


import FormButton from '../../components/FormButton';
import {AuthContext} from '../../navigation/AuthProvider';

export default function HomeScreen(){
    const {logout, user, userUID} = useContext(AuthContext);
    const [name, setName] = useState("");
    const [image, setImage] = useState("");
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
            <Title>Welcome Patients Chat <Text>{user}</Text></Title>
            <FormButton 
                modeValue="contained" 
                title="No thing!" 
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