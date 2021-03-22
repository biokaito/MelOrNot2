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
        Share,
        TextInput } from 'react-native';
import {Title} from 'react-native-paper';
import { firebase } from '../../firebase';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { ImageBackground } from 'react-native';
import { AntDesign } from 'react-native-vector-icons';

import FormButton from '../../components/FormButton';
import {AuthContext} from '../../navigation/AuthProvider';
import Loading from '../../components/Loading'

const{width,height} = Dimensions.get('window');
export default function HomeScreen(){
    const {logout, user} = useContext(AuthContext);
    const [name, setName] = useState("");
    const [news, setnews] = useState([])
    const [loading, setLoading] = useState(true)
    const dataNewsDemo = [
        {
            "id" : "1",
            "author": "Dan Peck",
            "title": "Hurricane Hanna makes landfall around 5 p.m. on Saturday.",
            "description": "Hurricane Hanna battered southern Texas with sustained winds of 75 mph and continued to deliver heavy rain and flash flooding as it moved inland late Saturday.",
            "url": "https://abcnews.go.com/US/hurricane-hanna-makes-landfall-texas/story?id=71985566",
            "source": "ABC News",
            "image": "https://s.abcnews.com/images/US/hanna-swimmer-mo_hpMain_20200725-163152_2_4x3t_384.jpg",
            "category": "general",
            "language": "en",
            "country": "us",
            "published_at": "2020-07-26T01:04:23+00:00"
        },
        {
            "id" : "2",
            "author": "TMZ Staff",
            "title": "Nicki Minaj's Husband Gets Permission To Be There For Baby's Birth",
            "description": "Kenneth can be in the room when Nicki gives birth ... a judge just granted his request to tweak his pre-trial release conditions so he can travel with Nicki. With the court's order in place, KP can travel with Nicki periodically on biz…",
            "url": "https://www.tmz.com/2020/07/30/nicki-minaj-husband-asks-judge-be-there-child-birth/",
            "source": "TMZ.com",
            "image": "https://imagez.tmz.com/image/c1/4by3/2020/07/30/c115ad2dc849438a97a0ad3097b416df_md.jpg",
            "category": "general",
            "language": "en",
            "country": "us",
            "published_at": "2020-08-01T05:34:47+00:00"
        },
        {
            "id" : "3",
            "author": "Michael Rothstein",
            "title": "New Lions safety Jayron Kearse suspended three games",
            "description": "Kearse, 26, signed with the Lions in March after four seasons in Minnesota, where he played in 62 games with five starts, making 79 tackles and defending eight passes.",
            "url": "https://www.espn.com/nfl/story/_/id/29572640/new-lions-safety-jayron-kearse-suspended-three-games",
            "source": "ESPN",
            "image": "https://a4.espncdn.com/combiner/i?img=%2Fphoto%2F2020%2F0111%2Fr651071_1296x729_16%2D9.jpg",
            "category": "sports",
            "language": "en",
            "country": "us",
            "published_at": "2020-07-31T23:23:14+00:00"
        }
    ]
    useEffect(()=>{
        //fetchNews();
        //console.log(news)
    })
    function fetchNews(){
        return fetch("https://newsapi.org/v2/top-headlines?country=us&category=health&apiKey=9a26f28d690644669fb65345aef49a62")
        .then(response => response.json())
        .then( responseJson =>{
            setnews(responseJson);
            setLoading(false);
            //console.log(news)
        })
        .catch((e) =>{
            console.log(e)
        })
    }
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
    // if(loading){
    //     return <Loading />;
    // }
    const renderItem_ = ({item}) => {
        return(
           <TouchableWithoutFeedback onPress={() =>Linking.openURL(item.url)}>
                <View style={styles.renderitem}>
                    <Image source={{uri : item.image }} style={[StyleSheet.absoluteFill,{borderRadius: 20}]} />
                    <View style={styles.gradient}>
                        <Text style={styles.titleArticle}>{item.title}</Text>
                        <Text style={styles.shareArticle} onPress={() => {
                            shareArticle(item.url)
                        }} ><AntDesign name="sharealt" size={30} /></Text>
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
                
                style={styles.header}>
                    <TextInput
                        style={styles.inputBox}
                        placeholder= "What do you want to read?"
                        placeholderTextColor='#666'
                    ></TextInput>
            </ImageBackground>
            <View style={styles.body}>
                <View style={styles.trendContainer}>
                    <View>
                        <Text style={styles.trendText}>Trending</Text>
                    </View>
                    <View>
                        <AntDesign name="rightcircle" size={24} />
                    </View>
                </View>
                <FlatList 
                    data={dataNewsDemo}
                    renderItem={renderItem_}
                    keyExtractor={item => item.id}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: '#e4fbff',
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
        backgroundColor: '#e4fbff'
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
        borderRadius: 20,
        marginLeft: 20
    },
    gradient:{
        width: '100%',
        height : '100%',
        borderRadius: 20,
        backgroundColor: 'rgba(0,0,0,0.3)'

    },
    trendContainer:{
        flexDirection:"row",
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 10,
        marginHorizontal: 30
    },
    trendText:{
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: -10
    },
    inputBox:{
        marginTop: 215,
        backgroundColor: '#fff',
        paddingLeft: 24,
        padding: 12,
        borderBottomRightRadius: 40,
        borderTopRightRadius: 40,
        width: "70%",
    },
})