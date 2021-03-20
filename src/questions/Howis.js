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
                   <Text style={styles.headerText}>How is melanoma skin cancer diagnosed?</Text>
               </View>
               <ScrollView style={styles.body}>
                   <Text style={styles.content}>
                    Melanoma is diagnosed under a microscope. This means that the entire mole is cut out and sent for further studies before a definitive diagnosis can be made. This is the only way to be sure if it is a melanoma. 
                    {"\n"}{"\n"}When you go to the doctor, he or she will make an assessment of the risk that the mole you have can be melanoma. 
                    {"\n"}{"\n"}The doctor may also ask you specific questions to better understand your risk of getting melanoma. 
                    {"\n"}{"\n"}To increase the accuracy further, your doctor may use a tool called a dermoscope. This tool is mainly used by dermatologists or other specifically trained medical professionals. The dermoscope is a specialised lens that can magnify the mole 15 – 25 times. This allows the doctor to see structures in the mole that cannot be seen with the naked eye. 
                    {"\n"}{"\n"}Since not all doctors are trained in dermoscopy, some doctors may choose to remove a mole without having this magnified look. They may instead choose to cut it out and send it directly for analysis or refer the patient to a specialized professional for further assessment. 
                    {"\n"}{"\n"}If your doctor informs you that the mole does not look alarming, you may choose to still keep an eye on it to see if it changes and get another assessment if it does. 
                    {"\n"}{"\n"}You can use this app to keep an eye on your moles to see if they change over time.
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