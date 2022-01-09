import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';


const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyC5E6HBQUjbC-74wj2rwnuo0ftI4Q1Jb34",
    authDomain: "takenotes2.firebaseapp.com",
    projectId: "takenotes2",
    storageBucket: "takenotes2.appspot.com",
    messagingSenderId: "652589926892",
    appId: "1:652589926892:web:7a173574f76a361a7958c9",
    measurementId: "G-S4CKQFZY9C"
});

export const auth = firebase.auth();
export  const db = firebaseApp.firestore();
