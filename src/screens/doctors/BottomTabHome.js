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
    const valueRef = useRef();
    useEffect(()=>{
        //console.log(data);
    },[data])
    const getData = async(email) =>{
        await firebase
        .firestore()
        .collection(`Users/${email}/Results`)
        .onSnapshot(snapshot =>{
            let data = [];
            snapshot.forEach(doc =>{
                data.push({...doc.data(), id: doc.id})
            })
            setData(data)
        })
        
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
                    setData([])
                    getData(email)
                    if(!data.length){
                        console.log(data, valueRef.current)
                        console.log("have no data")
                    }
                    else{
                        console.log(data,valueRef.current)
                        console.log("have data")
                    }
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