import React,{useState,useEffect, useContext} from 'react';
import {StyleSheet, View, Text } from 'react-native';
import {Title} from 'react-native-paper';
import { firebase } from '../../firebase';
import AsyncStorage from '@react-native-async-storage/async-storage'

import FormButton from '../../components/FormButton';
import FormInput from '../../components/FormInput';
import {AuthContext} from '../../navigation/AuthProvider';

export default function HomeScreen({navigation}){
    const {logout, user} = useContext(AuthContext);
    const [email, setEmail] = useState("");
    // useEffect(()=>{
    //     const user =  firebase.auth().currentUser
    //     if (user.displayName){
    //     setName(user.displayName)
    //     }
    //     else{
            
    //     }
    // })
    const getData = async(email) =>{
        await firebase
        .firestore()
        .collection(`Users/${email}/Results`)
        .onSnapshot(snapshot =>{
            let data = [];
            snapshot.forEach(doc =>{
                data.push({...doc.data(), id: doc.id})
            })
        setData(data);
        })
    }
    const search =  async(email)=>{
        await admin
        .auth()
        .getUserByEmail(email)
        .then((userRecord) => {
            // See the UserRecord reference doc for the contents of userRecord.
            console.log(`Successfully fetched user data: ${userRecord.toJSON()}`);
        })
        .catch((error) => {
            console.log('Error fetching user data:', error);
        });
    }
    return(
        <View style={styles.container}>
            <FormInput
                labelName="Patient's Email"
                value={email}
                onChangeText={(userEmail) => setEmail(userEmail)}
            />
            <FormButton 
                modeValue="contained" 
                title="Search" 
                onPress={()=>{
                    getData(email)
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