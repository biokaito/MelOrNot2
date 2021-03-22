import React,{useState,useEffect, useContext} from 'react';
import {StyleSheet, View, Text } from 'react-native';
import {Title} from 'react-native-paper';
import { firebase } from '../../firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ImagePicker from 'expo';

//import storage from '@react-native-firebase/storage';
//import firestore from '@react-native-firebase/firestore';

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
    const choosePhotoFromLibrary = async () => {
        const result = await ImagePicker.launchImageLibraryAsync();

        if(!result.canceled){
            uploadImage(result.uri, "test")
            .then(() => {
                alert("success")
            })
            .catch((e)=>{
                alert(e)
            })
        }
      }
    const uploadImage = async (uri, imageName) =>{
        const response = await fetch(uri);
        const blob = await response.blob();

        var ref = firebase.storage().ref().child("images/"+ imageName);
        return ref.put(blob);
    }
    return(
        <View style={styles.container}>
            <Title>Welcome Patients Chat <Text>{user}</Text></Title>
            <FormButton 
                modeValue="contained" 
                title="No thing!" 
                onPress={()=>{
                    choosePhotoFromLibrary()
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