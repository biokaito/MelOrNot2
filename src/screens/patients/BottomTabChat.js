import React,{useState,useEffect, useContext} from 'react';
import { SafeAreaView, TouchableOpacity, Image, FlatList, StyleSheet, View, Text } from 'react-native';
import {Title} from 'react-native-paper';
import {Feather, MaterialIcons } from '@expo/vector-icons';

import FormButton from '../../components/FormButton';
import {AuthContext} from '../../navigation/AuthProvider';
import { firebase } from '../../firebase';
import Loading from '../../components/Loading'

export default function HomeScreen({ navigation }){
    const {logout, user, userUID, loading, setLoading} = useContext(AuthContext);
    const [listDoctors, setListDoctors] = useState(null);
    const [image, setImage] = useState("");

    if(loading){
        return <Loading />;
    }
    const getDoctors = async () => {
        const querySnap = await firebase
        .firestore()
        .collection('Doctor')
        .onSnapshot(snapshot =>{
            let data = [];
            snapshot.forEach(doc =>{
                data.push({...doc.data(), id: doc.id})
            })
        setListDoctors(data);
        })
    }

    useEffect(()=>{
        setLoading(true)
        getDoctors()
        setLoading(false)
    },[])

    return(
        <View style={styles.container}>        
            <SafeAreaView />    
            <View style={styles.header}>         
                <Feather name="more-vertical" size={35}/>
                <Title style={styles.title}>Chat</Title>
                <MaterialIcons name="search" size={35}/>
            </View>
            <View style={styles.body}>
                <FlatList 
                    data={listDoctors}
                    renderItem={({item}) => {
                        return (
                        <TouchableOpacity onPress={() => navigation.navigate('ChatScreen',
                            {
                                name: item.name,
                                uid: item.uid
                            }
                        )}>
                            <View style={styles.myCard}>
                                <Image source={{uri:item.avt}} style={styles.img}/>
                                <View>
                                    <Text style={styles.textName}>{item.name}</Text>
                                    <Text style={styles.text}>{item.position}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                        )
                    }}       
                    keyExtractor={(item)=>item.uid}  
                    style={styles.flatList}           
                />
            </View>
        </View>
    );
} 

const styles = StyleSheet.create({
    container:{
        backgroundColor: "#55b3b1",
        flex: 1,
    },
    header:{
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10
    },
    body:{
        flex: 12,
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        backgroundColor: "#f5f5f5",
    },
    title:{
        fontSize: 30
    },
    img:{
        width: 90,
        height: 90
    },
    flatList:{
        marginTop: 30,
        paddingHorizontal: 30
    },
    myCard:{
       flexDirection:"row",
       margin:3,
       padding:4,
       backgroundColor:"white",
       borderBottomWidth:1,
       borderBottomColor:'grey',
       marginBottom: 15,
       alignItems: 'center'
    },
    text:{
        fontSize:13,
        marginLeft:15,
    },
    textName:{
        marginLeft:15,
        fontSize: 35,
        marginBottom: 5,
        fontWeight: 'bold'
    }
})