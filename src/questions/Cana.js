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
                   <Text style={styles.headerText}>Can a smartphone app diagnose melanoma skin cancer?</Text>
               </View>
               <ScrollView style={styles.body}>
                   <Text style={styles.content}>
                   The short and clear answer is no. Even though some research has showed promising results with algorithms for melanoma risk assessments on moles from pictures taken in clinical contexts, there is still a long way to go before we as consumers can get a diagnosis or even an adequate automatic risk assessment through our smartphones. 
                   {"\n"}{"\n"}Although services where you send your smartphone photo to a dermatologist have shown more promising results than algorithm-based services, we still don't think these services are accurate enough for melanoma skin cancer diagnoses to be offered directly to consumers through their smartphones. 
                   {"\n"}{"\n"}The doctors must also be able to ask you additional questions, touch the mole and look at it from different angles to have the best chances of making the correct diagnosis. 
                   {"\n"}{"\n"}Although a picture may be worth 1000 words it takes more to make a correct diagnosis. It is always best to go to a physical location to get your skin checked, even if this is a bit more time- consuming and potentially costs a little.
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