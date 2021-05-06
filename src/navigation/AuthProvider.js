import { NavigationContainer } from '@react-navigation/native';
import React, { createContext, useState } from 'react';

import { firebase } from '../firebase';

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) =>{
    const [user, setUser] = useState(null);    
    const [password, setPassword] = useState(null);
    const [errEditProfilePassword, setErrEditProfilePassword] = useState(null);
    const [prevPassword, setPrevPassword] = useState(null);
    const [newPassword, setNewPassword] = useState(null);
    const [confirmPassword, setConfirmPassword] = useState(null);
    const [userUID, setUserUID] = useState(null);
    const [userEmail, setUserEmail] = useState(null);
    const [loading, setLoading] = useState(false);
    const [isShowModal, setIsShowModal] = useState(false);
    const [errEmail, setErrEmail] = useState("");
    const [errPassword , setErrPassword] = useState("");
    const [errDisplayName, setErrDisplayName] = useState("");
    const [errEmailLogin, setErrEmailLogin] = useState("");
    const [errPasswordLogin , setErrPasswordLogin] = useState("");
    const [isShowDisplayNameModal, setShowDisplayNameModal] = useState(false);
    const [isShowPasswordModal, setShowPasswordModal] = useState(false);
    const [imageURL, setImageURL] = useState(null);
    const [akiec,setAkiec] = useState(null)
    const [bcc,setBcc] = useState(null)
    const [bkl,setBkl] = useState(null)
    const [df,setDf] = useState(null)
    const [melanoma,setMelanoma] = useState(null)
    const [nv,setNv] = useState(null)
    const [vasc,setVasc] = useState(null)
    return(
        <AuthContext.Provider
            value={{
                user,
                setUser,
                password,
                setPassword,
                prevPassword,
                setPrevPassword,
                newPassword,
                setNewPassword,
                confirmPassword,
                setConfirmPassword,
                errEditProfilePassword,
                setErrEditProfilePassword,
                userUID,
                setUserUID,
                userEmail,
                setUserEmail,
                loading,
                setLoading,
                isShowModal,
                setIsShowModal,
                errEmail,
                setErrEmail,
                errPassword,
                setErrPassword,
                errDisplayName,
                setErrDisplayName,
                errEmailLogin,
                setErrEmailLogin,
                errPasswordLogin,
                setErrPasswordLogin,
                isShowDisplayNameModal,
                setShowDisplayNameModal,
                isShowPasswordModal,
                setShowPasswordModal,
                imageURL, 
                setImageURL,
                akiec,
                setAkiec,
                bcc,
                setBcc,
                bkl,
                setBkl,
                df,
                setDf,
                melanoma,
                setMelanoma,
                nv,
                setNv,
                vasc,
                setVasc,
                login: async ( email, password) => {
                    //To Do
                    setErrEmailLogin("");
                    setErrPasswordLogin("");
                    if(email === ""){
                        setErrEmailLogin("This field can not be blank!")
                    }
                    else if(password === ""){
                        setErrPasswordLogin("This field can not be blank!")
                    }
                   if(email !== "" && password !== ""){
                    setLoading(true)
                    await firebase
                    .auth()
                    .signInWithEmailAndPassword(email, password)
                    .then(async () =>{
                        const user = firebase.auth().currentUser
                        await setUser(user.displayName);
                        await setPassword(password);
                        await setUserUID(user.uid);
                        await setUserEmail(user.email);
                        await setLoading(false)
                        console.log(user.displayName)
                    })
                    .catch(err =>{
                        if(err.code === 'auth/invalid-email'){
                            setErrEmailLogin("That email is invalid!")
                            setErrPasswordLogin("")
                            setLoading(false)
                        }
                        else if(err.code === 'auth/user-not-found'){
                            setErrEmailLogin("That user not found!")
                            setErrPasswordLogin("")
                            setLoading(false)
                        }
                        else if(err.code === 'auth/wrong-password'){
                            setErrEmailLogin("")
                            setErrPasswordLogin("That password is wrong!")
                            setLoading(false)
                        }

                    })
                   }
                },
                register: async (displayName, email, password) => {                    
                    setErrEmail("");
                    setErrPassword("");
                    setErrDisplayName("");
                    if(displayName === ""){
                        setErrDisplayName("Please give us your name!")
                    }
                    else if(displayName.indexOf("Dr.") !== -1 ){
                        setErrDisplayName("Please don't use 'Dr.' in your name!")
                    }
                    else if(email === ""){
                        setErrEmail("This field can not be blank!")
                    }
                    else if(password === ""){
                        setErrPassword("This field can not be blank!")
                    }
                    
                    if(email !== "" && password !== "" && displayName !== ""){
                        setLoading(!loading);
                        await firebase
                        .auth()                        
                        .createUserWithEmailAndPassword(email, password)                        
                        .then((credential) =>{
                            credential.user
                            .updateProfile({displayName: displayName})
                            .then(async () => {
                                console.log(displayName)
                            })
                        })
                        .then(() =>{
                            setIsShowModal(true);
                        })                 
                        .catch(err =>{
                            if(err.code === 'auth/email-already-in-use'){
                                setErrEmail("That email is already in use!")
                                setErrPassword("")
                                setLoading(!loading)
                            }
                            else if(err.code === 'auth/invalid-email'){
                                setErrEmail("That email is invalid!")
                                setErrPassword("")
                                setLoading(!loading)
                            }
                            else if(err.code === 'auth/weak-password'){
                                setErrEmail("")
                                setErrPassword("That password is too weak!")
                                setLoading(!loading)
                            }
                        })

                        await setLoading(false);
                        

                    }                        
                },
                updateProfile : async (name)=>{
                    await setLoading(true)
                        await firebase
                        .auth().currentUser
                        .updateProfile({
                            displayName: `${name}`
                        })
                        .then(
                            async() => {
                                const user = await firebase.auth().currentUser
                                setUser(user.displayName)
                                setShowDisplayNameModal(false)
                                setLoading(false)            
                            }
                        )
                },
                updatePasswordProfile : async (pass, prevpass, newpass, confirmpass)=>{
                    await setLoading(true)
                    if(newpass == null || prevpass == null || confirmpass == null || newpass == "" || prevpass == "" || confirmpass == ""){
                        setErrEditProfilePassword("Something blank!")
                        setLoading(false)
                    }
                    else {
                        if(pass !== prevpass){
                            setErrEditProfilePassword("Incorrect previous password!")
                            setLoading(false)
                        }
                        else if(newpass != confirmpass){
                                setErrEditProfilePassword("Incorrect confirm password!")
                                setLoading(false)
                        }
                        else if (newpass == pass){
                            setErrEditProfilePassword("That's your previous password")
                            setLoading(false)
                        }
                        else if (newpass.length < 6){
                            setErrEditProfilePassword("Weak password")
                            setLoading(false)
                        }
                        else{
                            const user = await firebase.auth().currentUser

                            user.updatePassword(newpass)
                            .then(
                                async() => {
                                    await setErrEditProfilePassword(null)  
                                    await setPrevPassword(null)
                                    await setNewPassword(null)
                                    await setConfirmPassword(null)                              
                                    await setShowPasswordModal(false)
                                    await setPassword(newpass)
                                    await setLoading(false) 
                                    alert("Success")  
                                }
                            )
                        }
                    }
                },
                logout: async () => {
                    setUser("")
                },
                getData: async (email, id) => {
                    await setLoading(true)
                        const userDocument = await firebase.firestore()
                        .collection(`Users/${email}/Results`)
                        .doc(`${id}`).get();
                        const {...item} = userDocument.data()
                        //console.log(item.akiec)
                        await setImageURL(item.imageURL)
                        await setAkiec(item.akiec.toString())
                        await setBcc(item.bcc.toString())
                        await setBkl(item.bkl.toString())
                        await setDf(item.df.toString())
                        await setMelanoma(item.melanoma.toString())
                        await setNv(item.nv.toString())
                        await setVasc( item.vasc.toString())
                        setLoading(false)
                },
                saveResult: async (email, id)=>{
                    if(akiec=="" ||bcc=="" ||bkl=="" ||df=="" ||melanoma=="" ||nv=="" ||vasc==""){
                        alert("Something is empty!!")
                    }
                    else{
                        await setLoading(true)
                        await firebase 
                        .firestore()
                        .collection(`Users/${email}/Results`)
                        .doc(`${id}`) 
                        .update({
                            akiec : akiec,//state
                            bcc : bcc,//state
                            bkl : bkl,//state
                            df : df,//state
                            melanoma : melanoma,
                            nv : nv,//state
                            vasc : vasc,//state
                        })
                        .then( async() => {
                            setLoading(false)
                            alert('Updated!')
                        });
                    }                  
                }
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}