import React,{useState,useEffect, useContext, useRef} from 'react';
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
    const [data,setData] = useState([])
    useEffect(()=>{
              setData([])
    },[])
    const getData = async(email) =>{
        if(email==""){
            alert("Input can not empty!")
        }
        else{
            await firebase
            .firestore()
            .collection(`Users/${email}/Results`)
            .onSnapshot(snapshot =>{
                let data = [];
                snapshot.forEach(doc =>{
                    data.push({...doc.data(), id: doc.id})
                })
                setData(data)
                if(data.length){
                    navigation.navigate("MedicalRecord", email)
                }
                else{
                    alert("Cann't find data")
                }
            })
            //console.log(data, 2)
        }      
        
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
                    //console.log(data, 1) // old data
                    getData(email) // change data
                    //console.log(data,3) // still old data
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