import firebase from 'firebase/compat/app';
import  initializeApp  from 'firebase/compat/app';
import {getDatabase} from 'firebase/compat/database';
import "firebase/firestore";
import "firebase/compat/firestore";


const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyBNR6o3JhtLLAKLfXC45UhX__2VzOyXr8c",
    authDomain: "crimereports-d260e.firebaseapp.com",
    databaseURL: "https://crimereports-d260e-default-rtdb.firebaseio.com",
    projectId: "crimereports-d260e",
    storageBucket: "crimereports-d260e.appspot.com",
    messagingSenderId: "970236483682",
    appId: "1:970236483682:web:c3430c03dddcd240bd193b",
    measurementId: "G-F39RHMXWKF"
  });


 
  export const db = firebaseApp.firestore()


  export default firebaseApp
  