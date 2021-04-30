import React,{useState,useEffect, useContext} from 'react';
import {View,
        Text,
        StyleSheet,
        ImageBackground,
        TextInput,
        Image, 
        TouchableOpacity, 
        ScrollView, 
        FlatList,
        } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Icon } from 'react-native-elements';

import {AuthContext} from '../../navigation/AuthProvider';

export default function HomeScreen( {navigation}){
    const {userEmail,userUID, user} = useContext(AuthContext);
    const [name, setName] = useState("");
    const [isSeenWhy,setIsSeenWhy] = useState(false);
    const [isSeenCana,setIsSeenCana] = useState(false);
    const [isSeenHowis,setIsSeenHowis] = useState(false);
    const [isSeenWhat,setIsSeenWhat] = useState(false);
    const [isSeenWhatS,setIsSeenWhatS] = useState(false);
    const image = { uri: "https://images.pexels.com/photos/227417/pexels-photo-227417.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" };
    const [gallery,setgallery] = useState([
        {
            image : require("../../images/1.png"),
            title : 'Excited',
            id : '1'
        },
        {
            image : require("../../images/2.png"),
            title : 'Tired',
            id : '2'
        },
        {
            image : require("../../images/3.png"),
            title : 'Stressfull',
            id : '3'
        },
        {
            image : require("../../images/4.png"),
            title : 'Pretty Good',
            id : '4'
        },
        {
            image : require("../../images/5.png"),
            title : 'Sick',
            id : '5'
        },

    ])
    // useEffect(()=>{
    //     const user =  firebase.auth().currentUser
    //     if (user.displayName){
    //     setName(user.displayName)
    //     }
    //     else{
            
    //     }
    // })
    return(
        <View>
            
            <View>
                <ImageBackground
                    source={require("../../images/background.jpg")}
                    style={{width: '100%',height: 250}}
                    imageStyle={{borderBottomRightRadius:110}}
                >
                    <View style={styles.darkOverlay}>
                        <View style={styles.headerText}>
                            <Text numberOfLines={1} style={styles.userGreet}>
                                Hello, {user}
                            </Text>
                            <Text style={styles.userText}>
                                How do you doing today?
                            </Text>
                        </View>
                        <View>
                            <TextInput
                                style={styles.inputBox}
                                placeholder= "Let me know"
                                placeholderTextColor='#666'
                            >
                                
                            </TextInput>
                        </View>
                    </View>
                </ImageBackground>
            </View>
            <ScrollView style={styles.bodyContainer}>
                <View>
                    <FlatList
                        horizontal={true}
                        data={gallery}
                        renderItem={({item}) => {
                            return(
                                <View style={styles.flatlistImageWrapper}>
                                    <TouchableOpacity>
                                        <Image 
                                        source={item.image}
                                        style={styles.flatlistImage}
                                        />
                                        <View style={styles.imageOverlay}></View>                                        
                                        <Text style={styles.flatlistTitle}>
                                            {<Icon
                                                name='podcast'
                                                type='font-awesome'
                                                color='white'
                                                size={16}           
                                            />}{" "}
                                        {item.title}
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            )
                        }}
                    >                    
                    </FlatList>
                    </View>
                    <View>
                        <Text style={styles.titleQuestion}>Learn</Text>
                        <TouchableOpacity onPress={()=>{navigation.navigate("Why"),setIsSeenWhy({isSeenWhy: true})}}>
                            <View style={styles.questionContainer}>
                                <View>
                                    <Text style={styles.questionText}>Why should you keep an eye on your skin?</Text>
                                </View>
                                <View>
                                    {isSeenWhy==false?
                                    <AntDesign name="right" size={20}/>
                                    :
                                    <AntDesign name="check" size={20}/>
                                    }
                                    
                                </View>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>{navigation.navigate("Can"),setIsSeenCana({isSeenCana: true})}}>
                            <View style={styles.questionContainer}>
                                <View>
                                    <Text style={styles.questionText}>Can a smartphone app diagnose melanoma skin cancer?</Text>
                                </View>
                                <View>
                                    {isSeenCana==false?
                                    <AntDesign name="right" size={20}/>
                                    :
                                    <AntDesign name="check" size={20}/>
                                    }
                                </View>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>{navigation.navigate("How"),setIsSeenHowis({isSeenHowis: true})}}>
                            <View style={styles.questionContainer}>
                                <View>
                                    <Text style={styles.questionText}>How is melanoma skin cancer diagnosed?</Text>
                                </View>
                                <View>
                                    {isSeenHowis==false?
                                    <AntDesign name="right" size={20}/>
                                    :
                                    <AntDesign name="check" size={20}/>
                                    }
                                </View>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>{navigation.navigate("What"),setIsSeenWhat({isSeenWhat: true})}}>
                            <View style={styles.questionContainer}>
                                <View>
                                    <Text style={styles.questionText}>What skin cancer risk factors should you be aware of?</Text>
                                </View>
                                <View>
                                {isSeenWhat==false?
                                    <AntDesign name="right" size={20}/>
                                    :
                                    <AntDesign name="check" size={20}/>
                                    }
                                </View>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>{navigation.navigate("Regularly"),setIsSeenWhatS({isSeenWhatS: true})}}>
                            <View style={styles.questionContainer}>
                                <View>
                                    <Text style={styles.questionText}>How often should you keep an eye on your skin?</Text>
                                </View>
                                <View>
                                {isSeenWhatS==false?
                                    <AntDesign name="right" size={20}/>
                                    :
                                    <AntDesign name="check" size={20}/>
                                    }
                                </View>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>{navigation.navigate("Regularly"),setIsSeenWhatS({isSeenWhatS: true})}}>
                            <View style={styles.questionContainer}>
                                <View>
                                    <Text style={styles.questionText}>How often should you keep an eye on your skin?</Text>
                                </View>
                                <View>
                                {isSeenWhatS==false?
                                    <AntDesign name="right" size={20}/>
                                    :
                                    <AntDesign name="check" size={20}/>
                                    }
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>
            </ScrollView>
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
    titleQuestion:{
        color: 'black',
        fontSize: 20,
        marginLeft: 20,
        fontWeight: 'bold'
    },
    questionContainer:{
        flexDirection: 'row',
        borderBottomColor: 'gray',
        borderBottomWidth: 0.5,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    questionText:{
        color:'gray',
        width: 290
    },
    bodyContainer:{
        height: "100%",
    },
    flatlistImage:{
        width: 120,
        height: 140,
        marginRight: 0,
        borderRadius: 20
    },
    flatlistTitle:{
        position: 'absolute',
        color: 'white',
        marginTop: 4,
        fontSize: 14,
        left: 10,
        bottom: 10
    },
    imageOverlay:{
        width: 120,
        height: 140,
        marginRight: 6,
        position: 'absolute',
        backgroundColor: '#000',
        opacity: 0.4,
        borderRadius: 20
    },
    flatlistImageWrapper:{
        paddingVertical: 10,
        paddingLeft: 8,
    },
    inputBox:{
        marginTop: 20,
        backgroundColor: '#fff',
        paddingLeft: 24,
        padding: 12,
        borderBottomRightRadius: 40,
        borderTopRightRadius: 40,
        width: "90%",
    },
    headerText:{
        paddingTop: 70,
        paddingLeft: 10
    },
    darkOverlay:{
        position: 'absolute',
        top: 0,
        right: 0,
        left: 0,
        height: 250,
        backgroundColor: "#000",
        opacity: 0.4,
        borderBottomRightRadius: 110,
    },
    userGreet:{
        fontSize: 38,
        fontWeight: 'bold',
        color: 'white'
    },
    userText:{
        fontSize: 16,
        fontWeight: 'normal',
        color: 'white'
    }
})