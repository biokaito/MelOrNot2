import React,{useState,useEffect, useContext, useRef} from 'react';
import {StyleSheet, View, Text, Image } from 'react-native';
import {Title} from 'react-native-paper';
import { firebase } from '../../firebase';
import AsyncStorage from '@react-native-async-storage/async-storage'

import FormButton from '../../components/FormButton';
import FormInput from '../../components/FormInput';
import {AuthContext} from '../../navigation/AuthProvider';
import ModalFail from '../../components/ModalFail';
import Loading from '../../components/Loading';

export default function HomeScreen({navigation}){
    const {logout, userEmail, user} = useContext(AuthContext);
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [isShowModal, setIsShowModal] = useState(false)
    const [data,setData] = useState([])
    useEffect(()=>{
              setData([])
    },[])
    if(loading){
        return <Loading />
    }
    if(isShowModal){
        return <ModalFail message="Have no data" isVisible={isShowModal} onBackdropPress={() => setIsShowModal(!isShowModal)} />;
    }  

    const getData = async(email) =>{
        if(email==""){
            setIsShowModal(!isShowModal)
        }
        else{
            await setLoading(true)
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
                    setLoading(false)
                    navigation.navigate("MedicalRecord", {userEmail: email})
                }
                else{
                    setLoading(false)
                    setIsShowModal(!isShowModal)
                }
            })
            //console.log(data, 2)
        }      
        
    }
    
    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={require('../../images/doctor-illustrator.png')} style={styles.image} />
                <View style={styles.textWrapper}>
                    <Text style={styles.textName}>{user}</Text>
                    <Text style={styles.textEmail}>{userEmail}</Text>
                </View>
            </View> 
            <View style={styles.footer}>
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
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: '#f5f5f5',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    header:{
        flex: 1,
        backgroundColor: "white",
        width: '100%',
        height: '100%',
        borderBottomRightRadius: 100,
        flexDirection: 'row',
        alignItems: 'center'
    },
    footer:{
        flex: 2,
        marginTop: 90,
        
    },
    image:{
        width: '50%',
        height: '80%',
        marginTop: 40,
        marginLeft: -10
    },
    textName:{
        fontSize: 50
    },
    textEmail:{
        fontSize: 18
    }
})