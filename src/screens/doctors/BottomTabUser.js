import React,{useState,useEffect, useContext} from 'react';
import {StyleSheet, View, Text,Image } from 'react-native';
import {Title, Button, TextInput } from 'react-native-paper';
import Modal from 'react-native-modal';
import { firebase } from '../../firebase';
import AsyncStorage from '@react-native-async-storage/async-storage'

import FormButton from '../../components/FormButton';
import {AuthContext} from '../../navigation/AuthProvider';
import Loading from '../../components/Loading'

export default function HomeScreen(){
    const {logout, user, userEmail, password, updateProfile, loading, errDisplayName} = useContext(AuthContext);
    const [nameEdited, setNameEdited] = useState("");
    
    useEffect(()=>{
        if (user){
        setNameEdited(user)
        }
    },[])
    if(loading){
        return <Loading />;
    }

    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={require('../../images/doctor-illu.jpg')} style={styles.image} />
                <Text style={styles.nameText} numberOfLines={1}>{user}</Text>
                <Text style={styles.editText} numberOfLines={1}>Edit profile</Text>
            </View>
            <View style={styles.footer}>        
            <Button labelStyle={styles.labelStyle} style={styles.changePasswordStyle} icon={'form-textbox-password'} mode="outlined" onPress={() => {console.log('change password')}}>
                Change password
            </Button>   
            <Button labelStyle={styles.labelStyle}  icon={'location-exit'} mode="outlined" onPress={() => logout()}>
                Log out
            </Button>
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
        flex: 4,
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fbfcff',
    },
    footer:{
        flex: 3,
        width: '100%',
        height: '100%',
        backgroundColor: '#55b3b1',
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
    },
    image:{
        width: '50%',
        height: '80%',
    },
    nameText:{
        fontSize: 40,
        fontFamily: 'Verdana',
        marginTop: -40
    },
    editText:{
        color: 'red',
        fontSize: 15,
        fontFamily: 'Verdana',
    },
    labelStyle:{
        fontSize:20,
        color: 'white',
    },
    changeDisplaynameStyle:{
        marginTop: 35
    },
    changePasswordStyle:{
        marginVertical: 10,
        marginTop: 40
    },
    modalStyle:{
        //flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '25%',
        backgroundColor: 'white',
        borderRadius: 20
    },
    inputWrapper:{
        width: '100%',
        flexDirection: 'row',
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    inputStyle:{
        width: '70%',
        marginRight: 10
    }
})