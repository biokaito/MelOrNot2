import React,{useState,useEffect, useContext} from 'react';
import {StyleSheet, View, Text,Image } from 'react-native';
import {Title, Button, TextInput } from 'react-native-paper';
import Modal from 'react-native-modal';
import { firebase } from '../../firebase';
import AsyncStorage from '@react-native-async-storage/async-storage'

import FormButton from '../../components/FormButton';
import FormInput from '../../components/FormInput';
import {AuthContext} from '../../navigation/AuthProvider';
import Loading from '../../components/Loading'

export default function HomeScreen(){
    const {logout, user, userEmail, password, updateProfile,isShowDisplayNameModal,setShowDisplayNameModal, loading,isShowPasswordModal,setShowPasswordModal,updatePasswordProfile, errDisplayName} = useContext(AuthContext);
    const [nameEdited, setNameEdited] = useState("");
    const [passEdited, setPassEdited] = useState("");
    const [passConfirm, setPassConfirm] = useState("");
    
    useEffect(()=>{
        if (user){
        setNameEdited(user)
        }
    },[])
    const toggleModal = () => {
        setShowDisplayNameModal(!isShowDisplayNameModal);
      };
    const togglePasswordModal = () => {
        setShowPasswordModal(!isShowPasswordModal);
    };
    if(loading){
        return <Loading />;
    }

    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={require('../../images/user-avt.jpg')} style={styles.image} />
                <Text style={styles.nameText} numberOfLines={1}>{user}</Text>
                <Text style={styles.editText} numberOfLines={1}>Edit profile</Text>
            </View>
            <View style={styles.footer}>         
            <Button labelStyle={styles.labelStyle} style={styles.changeDisplaynameStyle} icon={'face-agent'} mode="outlined" onPress={() => {setShowDisplayNameModal(true)}}>
                Change displayname
            </Button>
            <Button labelStyle={styles.labelStyle} style={styles.changePasswordStyle} icon={'form-textbox-password'} mode="outlined" onPress={() => {setShowPasswordModal(true)}}>
                Change password
            </Button>   
            <Button labelStyle={styles.labelStyle}  icon={'location-exit'} mode="outlined" onPress={() => logout()}>
                Log out
            </Button>
            </View>

            <Modal isVisible={isShowDisplayNameModal} onBackdropPress={toggleModal}>
                <View style={styles.modalStyle}>
                <View style={styles.title}>
                    <Title style={{fontSize: 30, marginTop: 10}}>Edit Name</Title>
                </View>
                <View style={styles.inputWrapper}>
                    <FormInput
                        label="Your displayname"
                        style={styles.inputStyle}
                        value={nameEdited}
                        onChangeText={text => {                            
                            setNameEdited(text)
                        }}
                    />
                    { nameEdited && nameEdited.indexOf("Dr.") !== 0? <Button style={{borderRadius: 15}} labelStyle={{fontSize: 16, paddingVertical: 13}} icon={'check-outline'} mode="contained" onPress={() => {updateProfile(nameEdited)}}>
                        Save
                    </Button> : null}
                </View>
                </View>
            </Modal>

            <Modal isVisible={isShowPasswordModal} onBackdropPress={togglePasswordModal}>
                <View style={styles.modalPasswordStyle}>
                <View style={styles.title}>
                    <Title style={{fontSize: 30, marginTop: 10}}>Edit Password</Title>
                </View>
                <View style={styles.inputPasswordWrapper}>
                    <TextInput
                        label="Your Previous Password"
                        style={styles.inputPasswordStyle}
                        value={nameEdited}
                        onChangeText={text => {                            
                            setNameEdited(text)
                        }}
                    />
                    <TextInput
                        label="Your New Password"
                        style={styles.inputPasswordStyle}
                        value={nameEdited}
                        onChangeText={text => {                            
                            setNameEdited(text)
                        }}
                    />
                    <TextInput
                        label="Confirm Your Password"
                        style={styles.inputPasswordStyle}
                        value={nameEdited}
                        onChangeText={text => {                            
                            setNameEdited(text)
                        }}
                    />
                    <Button style={{borderRadius: 15, marginTop: 10}} labelStyle={{fontSize: 16, paddingVertical: 13}} icon={'check-outline'} mode="outlined" onPress={() => {updatePasswordProfile(nameEdited)}}>Save</Button>
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
        backgroundColor: 'white',
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
        marginTop: -10
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
        marginTop: 40
    },
    changePasswordStyle:{
        marginVertical: 10
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
    modalPasswordStyle:{
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '50%',
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
    inputPasswordWrapper:{
        width: '100%',
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    inputStyle:{
        width: '70%',
        height: 60,
        marginRight: 10
    },
    inputPasswordStyle:{
        width: '70%',
        height: 60,
        marginVertical: 5
    }
})