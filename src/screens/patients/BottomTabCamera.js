import React, {useState,useEffect, useContext} from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Image, } from 'react-native';
import {Title} from 'react-native-paper';
import { firebase } from '../../firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import * as jpeg from "jpeg-js";
import AntDesign from '@expo/vector-icons/AntDesign';
import Modal from 'react-native-modal';
import * as tf from "@tensorflow/tfjs";
import { fetch, bundleResourceIO } from "@tensorflow/tfjs-react-native";

//import storage from '@react-native-firebase/storage';
//import firestore from '@react-native-firebase/firestore';

import FormButton from '../../components/FormButton';
import FormInput from '../../components/FormInput';
import {AuthContext} from '../../navigation/AuthProvider';
import Output from '../../components/Output';

export default function BottomTabCamera(){
    var id = 0;
    const {logout, user, userUID} = useContext(AuthContext);
    const [result, setResult] = useState("");
    //const [image, setImage] = useState("");
    const [imageURL, setImageURL] = useState("");
    
    const [isTfReady, setTfReady] = useState(false); 
    const [model, setModel] = useState(null); 
    const [image, setImage] = useState(null); 
    const [predictions, setPredictions] = useState(null); 
    const [error, setError] = useState(false); 
    const [isSave, setIsSave] = useState(false);
    const [currentDate, setCurrentDate] = useState('');
    const [currrentTime, setCurrentTime] = useState('');
    const [gallery, setGallery] = useState({
        source: '', 
        akiec: '',
        bcc: '',
        bkl: '',
        df: '',
        melanoma: '',
        nv: '',
        vasc: '',
        date : '',
        time : '',
        id : ''
      });
    useEffect(()=>{
        (async () =>{
          console.log("hi")
          setTfReady(true);
            await tf.ready();
             
            console.log("hihi")
            // khai báo và load model custom
            const model = require("../../PretrainedModel/model.json");
            const weights = require("../../PretrainedModel/weights.bin");
            const loadedModel = await tf.loadLayersModel(
                bundleResourceIO(model, weights)
            );
            
            setModel(loadedModel); 
                getPermissionAsync();
            })(); 
    },[]);
    async function getPermissionAsync() {
        if (Constants.platform.ios) {
          const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
          if (status !== "granted") {
            alert("Permission for camera access required.");
          }
          const { statusCam } = await Permissions.askAsync(Permissions.CAMERA);
          if (statusCam !== "granted") {
            alert("Permission for camera access required.");
          }
        }
      }
      async function imageToTensor(source) {
        //Load dữ liệu thô từ ảnh được select vào mảng
        const response = await fetch(source.uri, {}, { isBinary: true });
        const rawImageData = await response.arrayBuffer();
        const { width, height, data } = jpeg.decode(rawImageData, {
          useTArray: true, // Uint8Array = true
        });
      
        // loại bỏ alpha channel:
        const buffer = new Uint8Array(width * height * 3);
        let offset = 0;
        for (let i = 0; i < buffer.length; i += 3) {
          buffer[i] = data[offset];
          buffer[i + 1] = data[offset + 1];
          buffer[i + 2] = data[offset + 2];
          offset += 4;
        }
      
        // chuyển đổi ảnh sang dạng tensor
        const img = tf.tensor3d(buffer, [width, height, 3]);
      
        // tính toán cắt ảnh 
        const shorterSide = Math.min(width, height);
        const startingHeight = (height - shorterSide) / 2;
        const startingWidth = (width - shorterSide) / 2;
        const endingHeight = startingHeight + shorterSide;
        const endingWidth = startingWidth + shorterSide;
      
        // cắt và resize ảnh 224x224
        const sliced_img = img.slice(
          [startingWidth, startingHeight, 0],
          [endingWidth, endingHeight, 3]
        );
        const resized_img = tf.image.resizeBilinear(sliced_img, [224, 224]);
      
        // thêm dimension thứ 4 vào tensor
        const expanded_img = resized_img.expandDims(0);
      
        // chuẩn hóa các giá trị rgb thành -1-+1
        return expanded_img.toFloat().div(tf.scalar(127)).sub(tf.scalar(1));
      }
    
      async function handlerSelectImage() {
        try {
          let response = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true, // on Android user can rotate and crop the selected image; iOS users can only crop
            quality: 1, // Chất lượng ảnh cao nhất
            aspect: [4, 3], // duy trì tỷ lệ chuẩn
            //base64: true
          });
          //console.log(response.uri)
          if (!response.cancelled) {
            const source = { uri: response.uri };
            setImage(source); 
            const imageTensor = await imageToTensor(source); 
            const predictions = await model.predict(imageTensor); // send the image to the model
            setPredictions(predictions); 
            //console.log(response.uri)
          }
        } catch (error) {
          setError(error);
        }
      }
      async function handlerCaptureImage(){
        try{
          let response = await ImagePicker.launchCameraAsync({
              allowsEditing: true,
              aspect: [4, 3],
              quality: 1,
          });
          //console.log(response.uri)
          if (!response.cancelled) {
            const source = { uri: response.uri };
            setImage(source); // put image path to the state
            const imageTensor = await imageToTensor(source); // prepare the image
            const predictions = await model.predict(imageTensor); // send the image to the model
            setPredictions(predictions); // put model prediction to the state
          }
        } catch (error) {
          setError(error);
        }    
      }
      async function reset() {
        setPredictions(null);
        setImage(null);
        setError(false);
      }
      let status, statusMessage, showReset;

    const resetLink = (
      <View style={styles.resetLink}>
        <View>
          <TouchableOpacity onPress={reset} style={styles.restartButton}>
            <Text style={styles.reset}>
              Restart
            </Text>
          </TouchableOpacity>
        </View>
        {
          !error?
          <View>
            <TouchableOpacity style={styles.restartButton} >
              <Text style={styles.reset} >Save</Text>
            </TouchableOpacity>
          </View>
          :
          null
        }
      </View>
    );

  if (!error) {
    if (isTfReady && model && !image && !predictions) {
      status = "modelReady";
      statusMessage = "Model is ready.";
    } else if (model && image && predictions) {
      status = "finished";
      //statusMessage = "Prediction finished.";
      showReset = true;
    } else if (model && image && !predictions) {
      status = "modelPredict";
      statusMessage = "Predicting...";
    } else {
      status = "modelLoad";
      statusMessage = "Model is loading...";
    }
} else {
    //statusMessage = "Can't identify your image!";
    showReset = true;
    //console.log("loi la"+error);
}

    // const choosePhotoFromLibrary = async () => {
    //     const result = await ImagePicker.launchImageLibraryAsync({
    //         mediaTypes: ImagePicker.MediaTypeOptions.Images,
    //         allowsEditing: true, // on Android user can rotate and crop the selected image; iOS users can only crop
    //         quality: 1, // Chất lượng ảnh cao nhất
    //         aspect: [4, 3], // duy trì tỷ lệ chuẩn
    //         //base64: true
    //     });
    //     //console.log(result)
    //     const imageUri = result.uri;
    //     const fileName = imageUri.substring(imageUri.lastIndexOf('/') + 1);

    //     if(!result.canceled){   
    //         uploadImage(imageUri, fileName)
    //         .then(async () => {        
    //             const url = await firebase.storage().ref("images/" + fileName).getDownloadURL();
    //             await setImageURL(url)
    //             //console.log(url)      
                
    //             alert("success")
    //         })
    //         .catch((e)=>{
    //             alert(e)
    //         })
    //     }
    //   }
    // const uploadImage = async (uri, imageName) =>{
    //     const response = await fetch(uri);
    //     const blob = await response.blob();       
    //     var ref = firebase.storage().ref().child("images/"+ imageName);
    //     return ref.put(blob);
        
    // }
    // const saveResult = async() => {
    //     console.log('Image Url: ', imageURL);
    //     console.log('Post: ', result);
    //     firebase.firestore()
    //     .collection(`Users/${userUID}/Results`)
    //     .add({
    //         imageURL: imageURL,
    //         result: result
    //     })
    // }
    return(
      <View style={styles.container}>        
    <View style={styles.innercontainer}>         
      <TouchableOpacity
        style={styles.imageContainer}
        onPress={model && !predictions ? handlerSelectImage : () => {}} // Activates handler only if the model has been loaded and there are no predictions done yet
      >
        <Output
          status={status}
          image={image}
          predictions={predictions}
          error={error}
        />
      </TouchableOpacity>        
      <Text style={styles.status}>
        {statusMessage} {showReset ? resetLink : null}
        
      </Text>        
    </View>      
    <View style={styles.footer}>        
      {
       image ?
       <View style={styles.yourImage}>
        <Text style={styles.yourImageText}>Your image:</Text>
        <Image
          source={image}
          style={styles.yourImageFooter}
        >
        </Image>
       </View>
      : null
     }
    </View>
    <Modal isVisible={isSave} onBackdropPress={() => {setIsSave(!isSave)}}>
        <View style={styles.containerAlert}>
          <Image 
              source={require('../../images/tick.png')}
              style={styles.imageAlert}
          />
          <Text style={styles.nameAlert}>Saved!</Text>
        </View>
      </Modal>
  </View>
    );
}

const styles = StyleSheet.create({
    container:{
      backgroundColor: "#f4f4f2",
      alignItems: "center",
      justifyContent: "center",
      flex: 1,
    },
    restartButton:{
      //backgroundColor: 'black',
      padding: 3,
    },
    yourImageText:{
      fontSize: 20,
    },
    yourImageFooter:{
      height: 100, 
      width: 100,
      marginLeft: 20,
      borderRadius: 10,
      borderWidth: 2,
      borderColor: 'grey'
    },
    footer:{
      height:140,
      width:300, 
      position: 'absolute',
      bottom: 5, 
      //backgroundColor:'red',
      alignItems:'center',
      justifyContent: 'center'
    },
    yourImage:{
      flexDirection: 'row',
      alignItems: 'center',
    },
    camera:{
      position: 'absolute',
      top: 40,
      right: 40
    },  
    repo:{
      position: 'absolute',
      top: 40,
      left: 40
    },
    resetLink:{
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: 200
    },
    flatList:{
      padding: 4,
      marginBottom: 0,
    },
    shadowIcon:{
      shadowOpacity: 2,
      textShadowRadius: 3,
      textShadowOffset: { 
        width: 1, 
        height: 3 
      }
    },
    Definitions:{
      position: 'absolute',
      bottom: 20
    },
    innercontainer: {
      alignItems: "center",
      justifyContent: "center",
    },
    status: { 
      marginTop: 20,
      fontSize: 20
    },
    reset: { 
      color: "blue",
      fontSize: 20,
      
      fontFamily: 'HelveticaNeue-Bold'
    },
    imageContainer: {
      width: 350,
      height: 300,
      borderRadius: 20,
      opacity: 0.7,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "lightgrey",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 6,
      },
      shadowOpacity: 0.37,
      shadowRadius: 7.49,
      elevation: 12,
    },
    flatlistImage:{
      width: 50,
      height: 100,
      marginRight: 0,
  },
  flatlistTitle:{
      position: 'absolute',
      color: 'black',
      fontWeight: 'bold',
      marginTop: 4,
      fontSize: 14,
      left: "25%",
      bottom: 0
  },
  containerAlert: {
    backgroundColor: '#fff',
    borderRadius: 25,
    justifyContent: 'center',
    height: 200,
    width: 200,
    alignSelf: 'center'
  },
  imageAlert: {
      height: 80,
      width: 80,
      alignSelf: 'center',
      marginBottom: 20,
  },
  nameAlert: {
      fontWeight: '500',
      fontSize: 20,
      textAlign: 'center',
  },
})