import * as firebase from 'firebase';
import '@firebase/auth';
import '@firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBJ2dpDnGtKlsDQuYEh001NLxc3-eSgYSI",
    authDomain: "melornot-d4395.firebaseapp.com",
    databaseURL: "https://melornot-d4395-default-rtdb.firebaseio.com",
    projectId: "melornot-d4395",
    storageBucket: "melornot-d4395.appspot.com",
    messagingSenderId: "806544642700",
    appId: "1:806544642700:web:1d3ad6496c751ba8d621a9",
    measurementId: "G-YB8CRPC20P"
  };

if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
}
export { firebase };