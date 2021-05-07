import React from 'react';
import { StyleSheet, View,Image,Text } from 'react-native';
import Modal from 'react-native-modal'

export default function ModalSucess({...rest}) {
  return (
    <Modal animationIn="tada" animationOut="wobble" {...rest}>  
        <View style={styles.containerAlert}>
            <Image 
                source={require('../images/tick.png')}
                style={styles.imageAlert}
            />
            <Text style={styles.nameAlert}>Success!</Text>
        </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerAlert: {
    backgroundColor: '#fff',
    borderRadius: 25,
    justifyContent: 'center',
    height: 200,
    width: 250,
    alignSelf: 'center'
  },
  imageAlert: {
      height: 80,
      width: 80,
      alignSelf: 'center',
      marginBottom: 20,
  },
  nameAlert: {
      fontWeight: '500',
      fontSize: 30,
      textAlign: 'center',
  },
});