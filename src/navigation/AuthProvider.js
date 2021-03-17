import React, { createContext, useState } from 'react';

import { firebase } from '../firebase';

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) =>{
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [errEmail, setErrEmail] = useState("");
    const [errPassword , setErrPassword] = useState("");
    const [errDisplayName, setErrDisplayName] = useState("");
    return(
        <AuthContext.Provider
            value={{
                user,
                setUser,
                loading,
                setLoading,
                errEmail,
                setErrEmail,
                errPassword,
                setErrPassword,
                errDisplayName,
                setErrDisplayName,
                login: async ( email, password) => {
                    //To Do
                },
                register: async(displayName, email, password) => {                    
                    setErrEmail("");
                    setErrPassword("");
                    setErrDisplayName("");
                    if(displayName === ""){
                        setErrDisplayName("Please give us your name!")
                    }
                    else if(email === ""){
                        setErrEmail("This field can not be blank!")
                    }
                    else if(password === ""){
                        setErrPassword("This field can not be blank!")
                    }
                    
                    if(email !== "" && password !== "" && displayName !== ""){
                        setLoading(true);
                        await firebase
                        .auth()
                        // .catch(err =>{
                        //     if(err.code === 'auth/email-already-in-use'){
                        //         setErrEmail("That email is already in use!")
                        //         setErrPassword("")
                        //         setLoading(!loading)
                        //     }
                        //     else if(err.code === 'auth/invalid-email'){
                        //         setErrEmail("That email is invalid!")
                        //         setErrPassword("")
                        //         setLoading(!loading)
                        //     }
                        //     else if(err.code === 'auth/weak-password'){
                        //         setErrEmail("")
                        //         setErrPassword("That password is too weak!")
                        //         setLoading(!loading)
                        //     }
                        // })
                        .createUserWithEmailAndPassword(email, password)
                        .then((credential) =>{
                            credential.user
                            .updateProfile({displayName: displayName})
                            .then(async () => {
                                //ToDOo
                            })
                        })                 
                        setLoading(false)
                    }                        
                },
                logout: async () => {

                }
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}