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
const B = (props) => <Text style={{fontWeight: 'bold'}}>{props.children}</Text>
export default class Home extends React.Component{
    render(){
        return (
            <View>
                <SafeAreaView />
               <View style={styles.header}>
                   <AntDesign name={"infocirlceo"} size={50} color="#0e49b5" />
                   <Text style={styles.headerText}>What skin cancer risk factors should you be aware of?</Text>
               </View>
               <ScrollView style={styles.body}>
                   <Text style={styles.content}>
                        The fight against melanoma takes two forms: preventing it from happening in the first place and catching it early if it does. Knowing your risk factors can help you determine if you should take extra precautions in the sun, check your skin more often, or have a conversation with your general practitioner or a skin cancer specialist about your melanoma and skin cancer risk. 
                        {"\n"}{"\n"}Knowing which factors increase the risk of melanoma enables you to protect yourself better and can help you to be more vigilant if it turns out that you have an above-average risk for melanoma. 
                        {"\n"}{"\n"}<B>Your genes may increase your risk</B> 
                        {"\n"}Genetics play a role in melanoma. Genes also affect how you look, so you can easily recognize some genetic risk factors. 
                        {"\n"}{"\n"}<B>The following characteristics increase your risk:</B> 
                        {"\n"}{"\t"}- Bright/fair skin color 
                        {"\n"}{"\t"}- Blond or red hair color 
                        {"\n"}{"\t"}- Many moles 
                        {"\n"}{"\t"}- Many atypical moles 
                        {"\n"}{"\t"}- Many freckles 
                        {"\n"}{"\t"}- Having a family member with melanoma 
                        {"\n"}{"\n"}{"\n"}<B>Melanoma prevention is all about UV rays</B> 
                        {"\n"}UV rays also increase the risk of melanoma. If you are already at a higher risk due to genetics, it is important to be careful in the sun to reduce your exposure to UV rays. 
                        {"\n"}Regardless of your risk of melanoma, indoor tanning with tanning beds is always a no-go! Do you use or plan to use a sunbed in the future? Click here and find out why this is so risky. 
                        {"\n"}{"\n"}<B>The following activities can put you at a higher risk:</B> 
                        {"\n"}{"\t"}- Tanning in the sun or indoor tanning 
                        {"\n"}{"\t"}- Having a history of sunburns 
                        {"\n"}{"\t"}- Working outdoors e.g. in farming 
                        {"\n"}{"\t"}- Living in a country where the sun is strong 
                        {"\n"}{"\t"}- Skipping sunscreen or using only a little 
                        {"\n"}{"\n"}<B>The relationship between melanoma and other skin cancers</B> 
                        {"\n"}90 percent of non-melanoma skin cancers come from UV exposure. If you were ever diagnosed with skin cancer, you likely had a substantial amount of UV exposure. This does not mean you will automatically get melanoma but is something to keep in mind. 
                        {"\n"}{"\n"}If you think you have a higher melanoma risk (either from genetics or high UV exposure), there is no reason to panic. It is unlikely that you will get melanoma. However, since melanoma is highly treatable if caught early, it pays to keep an eye on your skin.
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
        height: 460
    },
    content:{
        color: 'gray'
    }
})