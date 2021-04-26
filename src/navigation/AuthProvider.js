import { NavigationContainer } from '@react-navigation/native';
import React, { createContext, useState } from 'react';

import { firebase } from '../firebase';

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) =>{
    const [user, setUser] = useState(null);
    const [userUID, setUserUID] = useState(null);
    const [userEmail, setUserEmail] = useState(null);
    const [loading, setLoading] = useState(false);
    const [isShowModal, setIsShowModal] = useState(false);
    const [errEmail, setErrEmail] = useState("");
    const [errPassword , setErrPassword] = useState("");
    const [errDisplayName, setErrDisplayName] = useState("");
    const [errEmailLogin, setErrEmailLogin] = useState("");
    const [errPasswordLogin , setErrPasswordLogin] = useState("");
    return(
        <AuthContext.Provider
            value={{
                user,
                setUser,
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
                        await setUserUID(user.uid);
                        await setUserEmail(user.email);
                        await setLoading(false)
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
                        .then(() =>{
                            setIsShowModal(true);
                        })
                        .then((credential) =>{
                            credential.user
                            .updateProfile({displayName: displayName})
                            .then(async () => {
                                //ToDOo
                            })
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
                logout: async () => {
                    setUser("")
                }
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}