import React,{useState,useEffect, useContext} from 'react';
import {StyleSheet, View, Text, SafeAreaView,ScrollView,Image, TouchableOpacity } from 'react-native';
import {Title} from 'react-native-paper';
import { firebase } from '../../firebase';
import {MaterialIcons, AntDesign } from '@expo/vector-icons';

import FormButton from '../../components/FormButton';
import {AuthContext} from '../../navigation/AuthProvider';
import FormInput from '../../components/FormInput'
import Loading from '../../components/Loading'

export default function DetailRecord({route, navigation}){
    const { getData, 
            loading, 
            setLoading, 
            saveResult,
            imageURL, 
            setImageURL,
            akiec,
            setAkiec,
            bcc,
            setBcc,
            bkl,
            setBkl,
            df,
            setDf,
            melanoma,
            setMelanoma,
            nv,
            setNv,
            vasc,
            setVasc } = useContext(AuthContext);
    const { userEmail, id} = route.params
    
    // const [name, setName] = useState("");
    // const [ID, setID] = useState("");
    // const [email, setEmail] = useState("");
    // const [imageURL, setImageURL] = useState(item.imageURL);
    // const [akiec,setAkiec] = useState(item.akiec)
    // const [bcc,setBcc] = useState(item.bcc)
    // const [bkl,setBkl] = useState(item.bkl)
    // const [df,setDf] = useState(item.df) 
    // const [melanoma,setMelanoma] = useState(item.melanoma)
    // const [nv,setNv] = useState(item.nv)
    // const [vasc,setVasc] = useState(item.vasc)
    
    

    useEffect( ()=>{
        //console.log(item)
        try {
            getData(userEmail,id)
        }
        catch(e){
            console.log(e)
        }
        //console.log(itemp)
    },[])
    // const setValue = (item) => {
    //     setImageURL(item.imageURL)
    //     setAkiec(item.akiec.toString())
    //     setBcc(item.bcc.toString())
    //     setBkl(item.bkl.toString())
    //     setDf(item.df.toString())
    //     setMelanoma(item.melanoma.toString())
    //     setNv(item.nv.toString())
    //     setVasc(item.vasc.toString())
    // }
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
                    saveResult(userEmail, id)
                    }} >
                    <MaterialIcons name="save-alt" size={35} color="black" />
                </TouchableOpacity>
                <Image source={{uri: imageURL}} style={styles.image} />
            </View>
            <View style={styles.footer}>
                <View style={styles.trendContainer}>
                    <View>
                        <Text style={styles.trendText}>The proportion of diseases</Text>
                    </View>
                    <View>
                        <MaterialIcons name="add-to-queue" size={25} />
                    </View>
                </View>
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
    },
    trendContainer:{
        flexDirection:"row",
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 10,
        marginHorizontal: 50
    },
    trendText:{
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 0
    },
})