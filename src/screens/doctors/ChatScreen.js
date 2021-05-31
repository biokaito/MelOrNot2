import React,{useState,useEffect, useContext} from 'react';
import {StyleSheet, View, Text, SafeAreaView } from 'react-native';
import {Title} from 'react-native-paper';
import {Feather, MaterialIcons } from '@expo/vector-icons';
import { GiftedChat, Bubble, InputToolbar} from 'react-native-gifted-chat'
import { firebase } from '../../firebase'

import FormButton from '../../components/FormButton';
import {AuthContext} from '../../navigation/AuthProvider';
import { TouchableOpacity } from 'react-native';
import Loading from '../../components/Loading'

export default function ChatScreen({navigation, route}){
    const {logout, user, userUID} = useContext(AuthContext);
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const {name, uid} = route.params
    const getAllMessages = async ()=>{
        const docid  = uid > userUID ? userUID + "-" + uid : uid + "-" + userUID
        const querySanp = await firebase
        .firestore()
        .collection('chatrooms')
        .doc(docid)
        .collection('messages')
        .orderBy('createdAt',"desc")
        .get()
       const allmsg = querySanp.docs.map(docSanp=>{
            return {
                ...docSanp.data(),
                createdAt:docSanp.data().createdAt.toDate()
            }
        })
        setMessages(allmsg)    
     }
    useEffect(()=>{
        setLoading(true)
        // getAllMessages()
        const docid  = uid > userUID ? userUID + "-" + uid : uid+"-"+ userUID
        const messageRef = firebase.firestore().collection('chatrooms')
        .doc(docid)
        .collection('messages')
        .orderBy('createdAt',"desc")

        const unSubscribe =  messageRef.onSnapshot((querySnap)=>{
            const allmsg =   querySnap.docs.map(docSanp=>{
             const data = docSanp.data()
             if(data.createdAt){
                 return {
                    ...docSanp.data(),
                    createdAt: docSanp.data().createdAt.toDate()
                }
             }else {
                return {
                    ...docSanp.data(),
                    createdAt: new Date()
                }
             }
                
            })
            setMessages(allmsg)
            setLoading(false)
        })
        return ()=>{
            unSubscribe()
            
          }
    },[])
    const onSend =(messageArray) => {
        const msg = messageArray[0]
        const mymsg = {
            ...msg,
            sentBy: userUID,
            sentTo: uid,
            createdAt: new Date()
        }
       setMessages(previousMessages => GiftedChat.append(previousMessages,mymsg))
       const docid  = uid > userUID ? userUID + "-" + uid : uid + "-" + userUID
 
       firebase
       .firestore()
       .collection('chatrooms')
       .doc(docid)
       .collection('messages')
       .add({...mymsg,createdAt: firebase.firestore.FieldValue.serverTimestamp()})
      }
    return(
        <View style={styles.container}>
            <SafeAreaView />
            <View style={styles.header}>         
                <TouchableOpacity onPress={()=> navigation.goBack()} style={styles.headerComponent}> 
                    <Feather name="arrow-left" size={35}/>                    
                </TouchableOpacity>
                <Title style={styles.title}>{name}</Title>
                <View style={styles.headerComponent}>
                    <Feather name="more-vertical" size={35}/>                
                    <MaterialIcons name="search" size={35}/>
                </View>                
            </View>
            <View style={styles.body}>
                <View style={styles.chatContainer}>
                    {loading? 
                    <Loading />
                    :
                    <GiftedChat 
                        messages={messages}
                        onSend={text => onSend(text)}
                        user={{
                            _id: userUID,
                        }}            
                        scrollToBottom
                        scrollToBottomComponent={() => (
                            <Feather name="chevrons-down" size={35}/>
                            )}        
                        renderBubble={(props)=>{
                            return <Bubble
                            {...props}
                            wrapperStyle={{
                                right: {
                                backgroundColor:"#55b3b1",
                                marginRight: 20,
                                },
                                left:{
                                    marginLeft: -30
                                },    

                            }}
                            />
                        }}
                        renderInputToolbar={(props)=>{
                            return (
                            <InputToolbar 
                                {...props}
                                containerStyle={{
                                    borderRadius: 30, 
                                    borderWidth: 1.5, 
                                    borderColor: '#55b3b1',
                                    paddingTop: 5,
                                }} 
                                textInputStyle={{ color: "black" }}
                                />
                            )
                        }}
                        renderActions={() => (
                            <Feather
                                style={styles.uploadImage}
                                onPress={()=>{
                                    console.log("ihih")
                                }}
                                name='image'
                                size={25}
                                color='#000'
                            />
                            )}
                    />
                    }
                </View>
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
        marginBottom: 70
    },
    title:{
        fontSize: 30,
        width: 220,
    },
    headerComponent:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    chatContainer:{
        flex : 1,
        marginTop: 35
    },
    uploadImage:{
        marginBottom: 12,
        marginLeft: 5, 
        color: '#55b3b1'
    }
})