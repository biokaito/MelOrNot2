import { AntDesign } from "@expo/vector-icons";
import React from "react";
import{
View,
Text,
StyleSheet,
ScrollView,
ImageBackground,
SafeAreaView
} from "react-native";

const image = { uri: "https://images.pexels.com/photos/227417/pexels-photo-227417.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" };

export default class Home extends React.Component{
    render(){
        return (
            <View>
                <SafeAreaView />
               <View style={styles.header}>
                   <AntDesign name={"infocirlceo"} size={50} color="#0e49b5" />
                   <Text style={styles.headerText}>How often should you keep an eye on your skin?</Text>
               </View>
               <ScrollView style={styles.body}>
                   <Text style={styles.content}>
                   Some people need to check their skin more often than others. 
                   {"\n"}{"\n"}If you have not seen a doctor for a suspicious mole, checking every 3 months is a good place to start. If you belong in a high-risk group for melanoma, you may want to do so every month instead. If you are in a low-risk group, checking your skin every 6 months or yearly may feel right to you. In the Miiskin app you can set how often you want to be reminded to follow up on your mole photos taken with the app. 
                   {"\n"}{"\n"}If you already talked with your doctor about checking your skin at home, follow his or her advice on how long the interval should be between your own follow-ups at home. 
                   {"\n"}{"\n"}Keeping an eye on your moles yourself at home may also complement professional follow-up by someone specialized in skin cancer, such as your doctor. 
                   {"\n"}{"\n"}The most important thing is to begin keeping an eye on your skin and seeing your doctor right away if you notice something suspicious.
                   </Text>
               </ScrollView>
            </View>
        )
    }
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    headerText:{
        fontSize: 30,
        marginLeft: 15
    },
    header:{
        flexDirection: 'row',
        alignItems: 'center',
        padding: 30,
        justifyContent: 'center'
    },
    body:{
        paddingHorizontal: 15,
        height: 500
    },
    content:{
        color: 'gray'
    }
})