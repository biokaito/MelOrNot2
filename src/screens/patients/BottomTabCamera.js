import React,{useState,useEffect, useContext} from 'react';
import {StyleSheet, View, Text } from 'react-native';
import {Title} from 'react-native-paper';
import { firebase } from '../../firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import * as jpeg from "jpeg-js";

//import storage from '@react-native-firebase/storage';
//import firestore from '@react-native-firebase/firestore';

import FormButton from '../../components/FormButton';
import FormInput from '../../components/FormInput';
import {AuthContext} from '../../navigation/AuthProvider';

export default function HomeScreen(){
    const {logout, user, userUID} = useContext(AuthContext);
    const [result, setResult] = useState("");
    const [image, setImage] = useState("");
    const [imageURL, setImageURL] = useState("");
    useEffect(()=>{
        (async () =>{
           await getPermissionAsync();
        }) 
    })
    async function getPermissionAsync() {
        if (Constants.platform.ios) {
          const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
          if (status !== "granted") {
            alert("Permission for camera access required.");
          }
          const { statusCam } = await Permissions.askAsync(Permissions.CAMERA);
          if (statusCam !== "granted") {
            alert("Permission for camera access required.");
          }
        }
      }
    const choosePhotoFromLibrary = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true, // on Android user can rotate and crop the selected image; iOS users can only crop
            quality: 1, // Chất lượng ảnh cao nhất
            aspect: [4, 3], // duy trì tỷ lệ chuẩn
            //base64: true
        });
        //console.log(result)
        const imageUri = result.uri;
        const fileName = imageUri.substring(imageUri.lastIndexOf('/') + 1);

        if(!result.canceled){   
            uploadImage(imageUri, fileName)
            .then(async () => {        
                const url = await firebase.storage().ref("images/" + fileName).getDownloadURL();
                await setImageURL(url)
                //console.log(url)      
                
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
    const saveResult = async() => {
        console.log('Image Url: ', imageURL);
        console.log('Post: ', result);
        firebase.firestore()
        .collection(`Users/${userUID}/Results`)
        .add({
            imageURL: imageURL,
            result: result
        })
    }
    return(
        <View style={styles.container}>
            <Title>Welcome Patients camera <Text>{user}</Text></Title>
            <FormButton 
                modeValue="contained" 
                title="Choose picture" 
                onPress={()=>{
                    choosePhotoFromLibrary()
            }} />
            <FormInput
                labelName="Result"
                value={result}
                autoCapitalize="none"
                onChangeText={(text) => setResult(text)}
            />
            <FormButton 
                modeValue="contained" 
                title="Save" 
                onPress={()=>{
                    saveResult()
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