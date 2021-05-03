import React,{useState,useEffect, useContext} from 'react';
import {StyleSheet, View, Text,Image } from 'react-native';
import {Title, Button, TextInput } from 'react-native-paper';
import Modal from 'react-native-modal';
import { firebase } from '../../firebase';
import AsyncStorage from '@react-native-async-storage/async-storage'

import FormButton from '../../components/FormButton';
import {AuthContext} from '../../navigation/AuthProvider';

export default function HomeScreen(){
    const {logout, user, userEmail, password, updateProfile} = useContext(AuthContext);
    const [name, setName] = useState("");
    const [nameEdited, setNameEdited] = useState("");
    const [isShowDisplayNameModal, setShowDisplayNameModal] = useState(false);
    const [isShowPasswordNameModal, setShowPasswordModal] = useState(false);
    useEffect(()=>{
        const user =  firebase.auth().currentUser
        if (user.displayName){
        setName(user.displayName)
        setNameEdited(user.displayName)
        }
        else{
            
        }
    },[])
    const toggleModal = () => {
        setShowDisplayNameModal(!isShowDisplayNameModal);
      };

    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={require('../../images/doctor-illu.jpg')} style={styles.image} />
                <Text style={styles.nameText} numberOfLines={1}>{name}</Text>
                <Text style={styles.editText} numberOfLines={1}>Edit profile</Text>
            </View>
            <View style={styles.footer}>         
            <Button labelStyle={styles.labelStyle} style={styles.changeDisplaynameStyle} icon={'face-agent'} mode="Outlined" onPress={() => {setShowDisplayNameModal(true)}}>
                Change displayname
            </Button>
            <Button labelStyle={styles.labelStyle} style={styles.changePasswordStyle} icon={'form-textbox-password'} mode="Outlined" onPress={() => {console.log('change password')}}>
                Change password
            </Button>   
            <Button labelStyle={styles.labelStyle}  icon={'location-exit'} mode="Outlined" onPress={() => logout()}>
                Log out
            </Button>
            </View>
            <Modal isVisible={isShowDisplayNameModal} onBackdropPress={toggleModal}>
                <View style={styles.modalStyle}>
                <View style={styles.title}>
                    <Title>Edit Name</Title>
                </View>
                <View style={styles.inputWrapper}>
                    <TextInput
                        label="Your displayname"
                        style={styles.inputStyle}
                        value={nameEdited}
                        onChangeText={text => setNameEdited(text)}
                    />
                    <Button labelStyle={{fontSize: 16}} icon={'check-outline'} mode="Outlined" onPress={() => {updateProfile(nameEdited)}}>
                        Save
                    </Button>
                </View>
                </View>
            </Modal>
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
        //color: 'white',
    },
    changeDisplaynameStyle:{
        marginTop: 35
    },
    changePasswordStyle:{
        marginVertical: 10
    },
    modalStyle:{
        //flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '30%',
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