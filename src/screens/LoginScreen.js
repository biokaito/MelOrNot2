import React, { useState, useContext } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { Title, IconButton } from 'react-native-paper';

import FormButton from '../components/FormButton';
import FormInput from '../components/FormInput';
import {AuthContext} from '../navigation/AuthProvider';
import Loading from '../components/Loading';


export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, loading, errEmailLogin, errPasswordLogin } = useContext(AuthContext);

  if(loading){
    return <Loading />;
  }
  return (
      <View style={styles.container}>
        <Image source={require('../images/logo.jpg')} style={{height: '30%', width: '90%', marginBottom: 20}} />
        <FormInput
            labelName="Email"
            value={email}
            autoCapitalize="none"
            onChangeText={(userEmail) => setEmail(userEmail)}
        />
        <Text>{errEmailLogin}</Text>
        <FormInput
            labelName="Password"
            value={password}
            secureTextEntry={true}
            onChangeText={(userPassword) => setPassword(userPassword)}
        />
        <Text>{errPasswordLogin}</Text>
        <FormButton
            title="Login"
            modeValue="contained"
            color="#55b3b1"
            labelStyle={styles.loginButtonLabel}
            onPress={() => {
              login(email, password)
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
    backgroundColor: '#fff',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText: {
    fontSize: 24,
    marginBottom: 10,
  },
  loginButtonLabel: {
    fontSize: 22,
    color: 'white',
    fontWeight: "bold"
  },
  navButtonText: {
    fontSize: 16,
  },
});