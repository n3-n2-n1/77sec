import firebase from 'firebase/compat/app';
import  initializeApp  from 'firebase/compat/app';
import {getDatabase} from 'firebase/compat/database';
import "firebase/firestore";
import "firebase/compat/firestore";
import { getMessaging } from "firebase/messaging";


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

  


 
const database = firebaseApp.firestore()

const requestForToken = () => {
  return getToken(messaging, { vapidKey: 'BHbg7-Wc_qAIF4e2AX1ZCAve_frkGYHjZwRT--oIBOjvcuDKV49Fl5qDLX6EXgEmVzWQvVKA8kpMbu9u0AfmfoM' })
    .then((currentToken) => {
      if (currentToken) {
        console.log('current token for client: ', currentToken);
        // Perform any other neccessary action with the token
      } else {
        // Show permission request UI
        console.log('No registration token available. Request permission to generate one.');
      }
    })
    .catch((err) => {
      console.log('An error occurred while retrieving token. ', err);
    });
};
export default firebaseApp
export {database}
export {requestForToken}