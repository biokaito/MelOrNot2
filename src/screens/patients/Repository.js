import React,{useState,useEffect, useContext} from 'react';
import {StyleSheet, View, Text, TextInput, ScrollView, FlatList, TouchableOpacity, ImageBackground, Image } from 'react-native';
import {AntDesign, MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native';
import Modal from 'react-native-modal';

import { firebase } from '../../firebase';
import {AuthContext} from '../../navigation/AuthProvider';
import FormButton from '../../components/FormButton';
import Loading from '../../components/Loading';
import ModalFail from '../../components/ModalFail';

export default function HomeScreen({navigation}){
    const [loading,setLoading] = useState(false);
    const [isShowModal,setIsShowModal] = useState(false);
    const {userEmail, user, userUID} = useContext(AuthContext);
    const [data, setData] = useState([])
    useEffect(()=>{
        setLoading(true)
        getData()
        setLoading(false)
    },[])
    const getData = () =>{
        firebase
        .firestore()
        .collection(`Users/${userEmail}/Results`)
        .onSnapshot(snapshot =>{
            let data = [];
            snapshot.forEach(doc =>{
                data.push({...doc.data(), id: doc.id})
            })
        setData(data);
        })
    }
    if(loading){
      return <Loading />;
    }
    const deleteResult = async (id) =>{
      await setLoading(true)
      await firebase
          .firestore()
          .collection(`Users/${userEmail}/Results`)
          .doc(`${id}`)
          .delete() 
          .then(()=>{
            setLoading(false)
            setIsShowModal(true)
            
          })
    }
    return(
        <View style={styles.container}>
            <SafeAreaView/>
            <View style={styles.wrapper1}>
                <View style={styles.header}>
                  <View>
                      <Text style={styles.headerText}>HISTORY</Text>
                  </View>
                </View>
                <TouchableOpacity style={styles.backIcon} onPress={()=>{
                  navigation.goBack()
                }} >
                  <MaterialIcons name="keyboard-backspace" size={35} color="black" />
                </TouchableOpacity>
            </View>
            <View style={styles.wrapper2}>
                <View>
                <TextInput
                    placeholder="Search by.."
                    style={styles.searchBar}
                    //value={searchInput}
                    //onChangeText={(text)=>_search(text)}
                />
                </View>
                <SafeAreaView style={{flex: 1}}>
                {data==""?
                <View style={styles.haveNoResult}>
                    <Text style={styles.textHaveNoResult}>Have no result</Text>
                    <FormButton 
                        modeValue="contained" 
                        title="Camera" 
                        onPress={()=>{
                          navigation.goBack()
                    }} />
                </View>
                :
                <FlatList 
                    data={data}
                    renderItem={({item,index})=>{
                    return(
                        <TouchableOpacity style={styles.wrapper} onPress={()=>{deleteResult(item.id)}} >
                        <View style={styles.headerComponent}>
                          
                              <View>
                                  <AntDesign name="closesquare" size={22} />
                              </View>

                            <View>
                            <Text style={styles.categoryText}>{item.time}</Text>
                            </View>                    
                        </View>

                        <View style={styles.middleComponent}>
                            <View style={styles.imageView}>
                                <Image source={{uri: item.imageURL}} style={styles.imageSave} />
                            </View>
                            <View style={styles.scrollViewInside}>
                            <View style={styles.headerInside}>                        
                                <View>
                                <ImageBackground
                                    source={require('../../images/circle.png')}
                                    style={styles.imageBackground}
                                >
                                    <Text style={styles.textNumberType}>{item.akiec}</Text>
                                </ImageBackground>
                                <View style={{alignItems: 'center'}}>
                                    <Text style={styles.textNameType}>akiec</Text>
                                </View>
                                </View>
                                <View>
                                <ImageBackground
                                    source={require('../../images/circle.png')}
                                    style={styles.imageBackground}
                                >
                                    <Text style={styles.textNumberType}>{item.melanoma}</Text>
                                </ImageBackground>
                                <View style={{alignItems: 'center'}}>
                                    <Text style={styles.textNameType}>mel</Text>
                                </View>
                                </View>
                                <View>
                                <ImageBackground
                                    source={require('../../images/circle.png')}
                                    style={styles.imageBackground}
                                >
                                    <Text style={styles.textNumberType}>{item.vasc}</Text>
                                </ImageBackground>
                                <View style={{alignItems: 'center'}}>
                                    <Text style={styles.textNameType}>vasc</Text>
                                </View>
                                </View>
                            </View>
                            <View style={styles.footerInside}>
                                <View>
                                    <ImageBackground
                                    source={require('../../images/circle.png')}
                                    style={styles.imageBackgroundfooter}
                                    >
                                    <Text style={styles.textNumberType}>{item.bcc}</Text>
                                    </ImageBackground>
                                    <View style={{alignItems: 'center'}}>
                                    <Text style={styles.textNameTypefooter}>bcc</Text>
                                    </View>
                                </View>
                                <View>
                                    <ImageBackground
                                    source={require('../../images/circle.png')}
                                    style={styles.imageBackgroundfooter}
                                    >
                                    <Text style={styles.textNumberType}>{item.bkl}</Text>
                                    </ImageBackground>
                                    <View style={{alignItems: 'center'}}>
                                    <Text style={styles.textNameTypefooter}>bkl</Text>
                                    </View>
                                </View>
                                <View>
                                    <ImageBackground
                                    source={require('../../images/circle.png')}
                                    style={styles.imageBackgroundfooter}
                                    >
                                    <Text style={styles.textNumberType}>{item.df}</Text>
                                    </ImageBackground>
                                    <View style={{alignItems: 'center'}}>
                                    <Text style={styles.textNameTypefooter}>df</Text>
                                    </View>
                                </View>
                                <View>
                                    <ImageBackground
                                    source={require('../../images/circle.png')}
                                    style={styles.imageBackgroundfooter}
                                    >
                                    <Text style={styles.textNumberType}>{item.nv}</Text>
                                    </ImageBackground>
                                    <View style={{alignItems: 'center'}}>
                                    <Text style={styles.textNameTypefooter}>nv</Text>
                                    </View>
                                </View> 
                            </View>
                            </View>
                            <View style={styles.dateStyle}>
                            <Text style={styles.dateText}>{item.date}</Text>
                            </View>
                        </View>

                        <View style={styles.crossbar} />

                        <View style={styles.bottomComponent}>
                            
                        </View>
                        </TouchableOpacity>
                    )
                    }}
                />  
              }
                </SafeAreaView>
            </View>
            <ModalFail message="Deleted" isVisible={isShowModal} onBackdropPress={() => setIsShowModal(!isShowModal)} />
            </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EEEEEE',
        alignItems: 'center',
        justifyContent: 'center',
      },
      header:{
        flexDirection: 'row'
      },
      haveNoResult:{
        flex: 0.8,
        backgroundColor: '#EEEEEE',
        alignItems: 'center',
        justifyContent: 'center',
      },
      textHaveNoResult:{
        fontSize: 20,
        fontWeight: '400',
        marginBottom: 15
      },
      headerText:{
        fontSize: 25,
        fontWeight: 'bold',
        textShadowColor: 'rgba(0, 0, 0, 0.5)',
        textShadowOffset: {
          width: 0, 
          height: 4
        },
        textShadowRadius: 10
      },
      categoryText:{
        fontSize: 15,
        fontFamily: 'Futura',
        fontStyle: 'italic'
      },
      dateText:{
        fontSize: 20,
        fontWeight: 'bold'
      },
      headerComponent:{
        flex: 1.3,
        flexDirection: 'row',
        justifyContent: 'space-between',
        //backgroundColor: 'red'
      },
      imageView:{
    
      },
      headerInside:{
        flex: 1,
        //backgroundColor: 'purple',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
      },
      footerInside:{
        flex: 1,
        //backgroundColor: 'pink',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
      },
      scrollViewInside:{
        //backgroundColor: 'white',
        height: '100%',
        width:150,
      },
      imageSave:{
        height: 60,
        width: 60,
        borderRadius: 10
      },
      bottomComponent:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 3,
        //backgroundColor: 'blue'
      },
      middleComponent:{
        flexDirection: 'row',
        justifyContent: 'space-between',    
        alignItems: 'center',
        marginBottom: 7,
        height: 100,
        //backgroundColor: 'green',
        flex: 6,
      },
      crossbar:{
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
        width: 230,
        marginLeft: '17%'
      },
      wrapper:{
        width: '100%',
        height: 160,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 10,
        marginBottom: 10,
        borderLeftWidth: 10,
        borderLeftColor: '#55b3b1'
      },
      wrapper1:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#55b3b1',
        borderBottomLeftRadius: 50,
        borderBottomRightRadius: 50,
        width: '100%',
        padding: 5,
        shadowColor: 'black',
        shadowOpacity: 1,
        shadowRadius: 12,
        shadowOffset: {
          width: 4,
          height: -4
        },
      },
      wrapper2:{
        flex: 10,
        width: '100%',
        padding: 5,
      },
      searchBar:{
        marginLeft: 5,
        backgroundColor: '#bbbbbb',
        padding: 10,
        borderRadius: 50,
        marginTop: 5,
        marginBottom: 10
      },
      iconReload:{
        position: 'absolute',
        top: 0,
        right: -90,
      },
      textNumberType:{
        fontSize: 10,
      },
      imageBackground:{
        width: 30,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 10,
        marginRight: 10,
      },
      imageBackgroundfooter:{
        width: 30,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 5
      },
      textNameType:{
        fontSize: 11,
        marginLeft: 10,
        marginRight: 10,
      },
      textNameTypefooter:{
        fontSize: 11,
        marginHorizontal: 5
      },
      backIcon:{
        position: 'absolute',
        top: 15,
        left: 15
      }
})