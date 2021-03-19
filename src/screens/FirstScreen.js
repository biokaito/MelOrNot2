import React,{useState, useContext} from 'react';
import {StyleSheet, View,Text, Image, ScrollView } from 'react-native';
import {Title} from 'react-native-paper';

import FormButton from '../components/FormButton';
import {AuthContext} from '../navigation/AuthProvider';
import {FlatListSlider} from 'react-native-flatlist-slider';
import Preview from '../components/Preview';

export default function FirstScreen({ navigation }){
    const images =[
        {
            image:
            'https://i.ibb.co/gtyHyjn/carouselimage2.jpg',
            desc: 'Silent Waters in the mountains in midst of Himilayas',
        },
        {
            image:
            'https://i.ibb.co/09Wxw5P/carouselimage3.jpg',
            desc: 'Silent Waters in the mountains in midst of Himilayas',
        },
        {
            image:
            'https://i.ibb.co/YR40cCx/carouselimage1.jpg',
            desc: 'Silent Waters in the mountains in midst of Himilayas',
        },
          
    ]
    return(
        <View style={styles.container}>
            <View style={styles.topscreen}>
                <FlatListSlider
                     data={images}
                     height={"100%"}
                     timer={5000}
                     onPress={item => { }}
                     //contentContainerStyle={{paddingHorizontal: 16}}
                     indicatorContainerStyle={{position:'absolute', bottom: 20}}
                     indicatorActiveColor={'#8e44ad'}
                     indicatorInActiveColor={'#ffffff'}
                     indicatorActiveWidth={30}
                     animation
                />
            {/* <Image source={require("../images/carouselimage1.jpg")} style={{width: '100%', height: '100%'}}/> */}
            </View>
            <View style={styles.botscreen}>
                <View style={styles.buttoncontainer}>
                    <FormButton
                        title="Login"
                        modeValue="contained"
                        color="#55b3b1"
                        style={styles.button}
                        labelStyle={styles.loginButtonLabel}                        
                        onPress={() => navigation.navigate('Login')}
                    />
                    <FormButton
                        title="Register"
                        modeValue="contained"
                        color="white"
                        labelStyle={styles.registerButtonLabel}
                        onPress={() => navigation.navigate('Register')}
                    />
                </View>
                <View>
                   <Text style={styles.bottomText}> Do you want get some help? <Text style={styles.clickText}>Get here</Text></Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flexDirection: 'column',
        flex: 1,
        backgroundColor: '#fff',
    },
    topscreen:{
        flex: 4,
        backgroundColor: '#eee',
        //justifyContent: 'center',
        //alignItems: 'center',
        
    },
    botscreen:{
        flex: 2,
        backgroundColor: '#55b3b1',
        //justifyContent: 'center',
        alignItems: 'center',
        borderTopRightRadius: 100
    },
    buttoncontainer:{
        //flexDirection: 'row',
        marginVertical: 30
    },
    loginButtonLabel:{
        fontSize: 22,
        borderRadius: 10,
        color: 'white',
        fontWeight: 'bold'
    },
    registerButtonLabel:{
        fontSize: 22,
        color: '#64dfdf',
        fontWeight: 'bold'
    },
    button:{
        borderRadius: 30
    },
    bottomText:{
        fontSize: 16,
        color: 'white'
    },
    clickText:{
        textDecorationLine: 'underline'
    }
})