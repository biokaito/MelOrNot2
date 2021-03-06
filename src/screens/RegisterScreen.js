import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { IconButton, Title } from 'react-native-paper';
import { AuthContext } from '../navigation/AuthProvider';

import FormButton from '../components/FormButton';
import FormInput from '../components/FormInput';
import Loading from '../components/Loading';
import ModalSucess from '../components/ModalSuccess';


export default function SignupScreen({ navigation }) {
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const closeModal = ()=>{
    setIsShowModal(false)
    setErrEmail("")
    setErrPassword("")
    setErrDisplayName("")
    setDisplayName("")
    setEmail("")
    setPassword("")
    navigation.navigate("Login")
  }
  
  const { register, loading, errEmail, setErrEmail, errPassword, setErrPassword, errDisplayName,setErrDisplayName, isShowModal, setIsShowModal } = useContext(AuthContext);
  if(loading){
    return <Loading />;
  }
  if(isShowModal){
    return <ModalSucess isVisible={isShowModal} onBackdropPress={() => closeModal()} />;
  }  

  return (
      <View style={styles.container}>
        <Title style={styles.titleText}>Let's join with us!</Title>
        <FormInput
            labelName="Display Name"
            value={displayName}
            autoCapitalize="none"
            onChangeText={(userDisplayName) => setDisplayName(userDisplayName)}
        />
        <Text style={styles.error}>{errDisplayName}</Text>
        <FormInput
            labelName="Email"
            value={email}
            autoCapitalize="none"
            onChangeText={(userEmail) => setEmail(userEmail)}
        />
        <Text style={styles.error}>{errEmail}</Text>
        <FormInput
            labelName="Password"
            value={password}
            secureTextEntry={true}
            onChangeText={(userPassword) => setPassword(userPassword)}
        />
        <Text style={styles.error}>{errPassword}</Text>
        <FormButton
            title="Signup"
            modeValue="contained"
            color="#55b3b1"
            labelStyle={styles.loginButtonLabel}
            onPress={async () => {
              register(displayName, email, password) 
            }}
        />
        <IconButton
            icon="keyboard-backspace"
            size={30}
            style={styles.navButton}
            color="#5b3a70"
            onPress={() => navigation.goBack()}
        />        
      </View>
      
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5f5f5',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText: {
    fontSize: 26,
    marginBottom: 10,
  },
  loginButtonLabel: {
    fontSize: 22,
    color: 'white',
    fontWeight: "bold"
  },
  navButtonText: {
    fontSize: 18,
  },
  navButton: {
    marginTop: 10,
  },
  error:{
    color: 'red',
    fontStyle: 'italic',
    //justifyContent: 'flex-start'
  },
  
});