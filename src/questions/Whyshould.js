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
                   <Text style={styles.headerText}>Why should you keep an eye on your skin?</Text>
               </View>
               <ScrollView style={styles.body}>
                   <Text style={styles.content}>
                        If you ever get a melanoma diagnosis, which is fortunately unlikely for most people, the diagnosis you want to hear is melanoma in situ – meaning the melanoma is still only present on the skin. 
                        {"\n"}Melanoma in situ, also known as Stage 0, is completely curable and has a 5-year survival rate of 99-100%. 
                        {"\n"}{"\n"}When melanoma is not caught early, the survival rates drop rapidly. 
                        {"\n"}{"\n"}The prospect of cancer can be scary, but melanoma's high survival rate when caught early is comforting. Do not be scared to look at your skin for changes. Do not be afraid to see a doctor with any concerns as early as possible. 
                        {"\n"}{"\n"}When it comes to finding melanomas, patients are often the ones to sound the alarm. Ordinary people can and should get better at noticing changes on their skin. 
                        {"\n"}{"\n"}Keeping an eye on your skin is one way you can be proactive about your own health. That's why we like to refer to its app as a lifestyle app. It's one out of many things you can do for your health. 
                        {"\n"}{"\n"}There are those who smoke and those who don't. Some eat a lot of greens and others don't. There are those who don't keep an eye on their skin regularly. We hope you'll empower yourself to take charge of your skin health and be one who does.
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