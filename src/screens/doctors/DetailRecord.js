import React,{useState,useEffect, useContext} from 'react';
import {StyleSheet, View, Text, SafeAreaView,ScrollView,Image, TouchableOpacity } from 'react-native';
import {Title} from 'react-native-paper';
import { firebase } from '../../firebase';
import {MaterialIcons } from '@expo/vector-icons';

import FormButton from '../../components/FormButton';
import {AuthContext} from '../../navigation/AuthProvider';
import FormInput from '../../components/FormInput'
import Loading from '../../components/Loading'

export default function DetailRecord({route, navigation}){
    const {logout, user} = useContext(AuthContext);
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);
    const [akiec,setAkiec] = useState("")
    const [bcc,setBcc] = useState("")
    const [bkl,setBkl] = useState("")
    const [df,setDf] = useState("")
    const [melanoma,setMelanoma] = useState("")
    const [nv,setNv] = useState("")
    const [vasc,setVasc] = useState("")
    const {item, userEmail, id} = route.params

    useEffect(()=>{
        console.log(id)
        setAkiec(item.akiec.toString())
        setBcc(item.bcc.toString())
        setBkl(item.bkl.toString())
        setDf(item.df.toString())
        setMelanoma(item.melanoma.toString())
        setNv(item.nv.toString())
        setVasc(item.vasc.toString())
    },[])
    
    const saveResult = async ()=>{
        if(akiec=="" || bcc=="" ||bkl=="" ||df=="" ||melanoma=="" ||nv=="" ||vasc==""){
            alert("Something is empty!!")
        }
        else{
            await setLoading(true)
            await firebase
            .firestore()
            .collection(`Users/${userEmail}/Results`)
            .doc(`${id}`)
            .update({
                akiec : akiec,
                bcc : bcc,
                bkl : bkl,
                df : df,
                melanoma : melanoma,
                nv : nv,
                vasc : vasc,
            })
            .then( async() => {
                setLoading(false)
                alert('Updated!')
            });
        }
    }
    if(loading){
        return <Loading />;
    }
    return(
        <View style={styles.container}>
            <SafeAreaView />
            <View style={styles.header}>
                <TouchableOpacity style={styles.backIcon} onPress={()=>{
                    navigation.goBack()
                    }} >
                    <MaterialIcons name="keyboard-backspace" size={35} color="black" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.saveIcon} onPress={()=>{
                    saveResult()
                    }} >
                    <MaterialIcons name="save-alt" size={35} color="black" />
                </TouchableOpacity>
                <Image source={{uri: item.imageURL}} style={styles.image} />
            </View>
            <View style={styles.footer}>
                <ScrollView 
                    style={styles.scrollView}
                    contentContainerStyle={styles.contentScrollView}
                >
                    <View style={styles.typeWrapper}>
                        <FormInput
                            labelName={"Intraepithelial Carcinoma"}
                            value={akiec}
                            autoCapitalize="none"
                            onChangeText={(value) => setAkiec(value)}
                        />
                    </View>
                    <View style={styles.typeWrapper}>
                        <FormInput
                            labelName={"Basal Cell Carcinoma"}
                            value={bcc}
                            autoCapitalize="none"
                            onChangeText={(value) => setBcc(value)}
                        />
                    </View>
                    <View style={styles.typeWrapper}>
                        <FormInput
                            labelName={"Benign Keratosis-like Lesions"}
                            value={bkl}
                            autoCapitalize="none"
                            onChangeText={(value) => setBkl(value)}
                        />
                    </View>
                    <View style={styles.typeWrapper}>
                        <FormInput
                            labelName={"Dermatofibroma"}
                            value={df}
                            autoCapitalize="none"
                            onChangeText={(value) => setDf(value)}
                        />
                    </View>
                    <View style={styles.typeWrapper}>
                        <FormInput
                            labelName={"Melanoma"}
                            value={melanoma}
                            autoCapitalize="none"
                            onChangeText={(value) => setMelanoma(value)}
                        />
                    </View>
                    <View style={styles.typeWrapper}>
                        <FormInput
                            labelName={"Melanocytic Nevus"}
                            value={nv}
                            autoCapitalize="none"
                            onChangeText={(value) => setNv(value)}
                        />
                    </View>
                    <View style={styles.typeWrapper}>
                        <FormInput
                            labelName={"Vascular Lesions"}
                            value={vasc}
                            autoCapitalize="none"
                            onChangeText={(value) => setVasc(value)}
                        />
                    </View>
                </ScrollView>
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
        flex: 1
    },
    footer: {
        flex: 2,
        width: '100%',
        height: '100%',
        backgroundColor: '#f8f5f1',
        borderTopRightRadius: 70,
        borderWidth: 1,
        borderColor: '#55b3b1'
    },
    image:{
        width: 210,
        height: 210,
        borderWidth: 1,
        borderColor: 'black',
        marginTop: 30
    },
    typeWrapper:{
        flexDirection: 'row',
        alignItems: 'center'
    },
    scrollView:{
        marginBottom: 150,
    },
    contentScrollView:{
        alignItems: 'center'
    },
    backIcon:{
        position: 'absolute',
        top: 15,
        left: -70
    },
    saveIcon:{
        position: 'absolute',
        top: 15,
        right: -70
    }
})