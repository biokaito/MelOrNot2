import React,{useState,useEffect, useContext} from 'react';
import {View,
        Text,
        StyleSheet,
        ActivityIndicator,
        FlatList,
        Dimensions,
        Image,
        TouchableWithoutFeedback,
        Linking,
        Share } from 'react-native';
import {Title} from 'react-native-paper';
import { firebase } from '../../firebase';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { ImageBackground } from 'react-native';

import FormButton from '../../components/FormButton';
import {AuthContext} from '../../navigation/AuthProvider';
import Loading from '../../components/Loading'

const{width,height} = Dimensions.get('window');
export default function HomeScreen(){
    const {logout, user} = useContext(AuthContext);
    const [name, setName] = useState("");
    const [news, setnews] = useState([])
    const [loading, setLoading] = useState(true)
    useEffect(()=>{
        fetch("https://newsapi.org/v2/top-headlines?country=us&category=health&apiKey=9a26f28d690644669fb65345aef49a62")
        .then(response => response.json())
        .then( responseJson =>{
            setnews(responseJson);
            setLoading(false);
            //console.log(news)
        })
    })
    const shareArticle = async (article) => {
        try{
            await Share.share({
                message: 'Checkout this article: '+ article
            })
        }
        catch(e){
            console.log(e)
        }
    }
    if(loading){
        return <Loading />;
    }
    const renderItem_ = ({item}) => {
        return(
           <TouchableWithoutFeedback onPress={() =>Linking.openURL(item.url)}>
                <View style={styles.renderitem}>
                    <Image source={{uri : item.urlToImage }} style={[StyleSheet.absoluteFill,{borderRadius:30}]} />
                    <View style={styles.gradient}>
                    <Text style={styles.titleArticle}>{item.title}</Text>
                    <Text style={styles.shareArticle} onPress={() => {
                        shareArticle(item.url)
                    }} >Share</Text>
                    </View>
                </View>
           </TouchableWithoutFeedback>
        )
    }
    return(
        <View style={styles.container}>
            <ImageBackground 
                source={require("../../images/headerNews.jpg")} 
                imageStyle={{ borderBottomRightRadius: 100}}
                style={styles.header}
            />
            <View style={styles.body}>
                <Text>hihi</Text>
                <FlatList 
                    data={news}
                    renderItem={renderItem_}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: '#f5f5f5',
        flex: 1,
        //justifyContent: 'center',
        //alignItems: 'center',
        flexDirection: "column"
    },
    header:{
        flex: 1,
        borderBottomRightRadius: 50
    },
    body:{
        flex: 2,
        backgroundColor: '#f5f5f5'
    },
    shareArticle:{
        fontSize: 14,
        color: '#FFFFFF',
        position: 'absolute',
        top : 0,
        right : 0,
        padding : 10,
        fontStyle: 'italic'
    },
    titleArticle:{
        position : 'absolute',
        bottom: 0,
        color: '#FFFFFF',
        fontSize: 18,
        padding: 5
    },
    renderitem:{
        width: width-50,
        height: 200,
        backgroundColor: '#ffffff',
        marginBottom: 15,
        borderRadius: 30,
    },
    gradient:{
        width: '100%',
        height : '100%',
        borderRadius: 30,
        backgroundColor: 'rgba(0,0,0,0.5)'

    }
})