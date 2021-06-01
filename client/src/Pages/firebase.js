import firebase from "firebase/app";
import 'firebase/auth'

const  firebaseConfig = {
    apiKey: "AIzaSyBeqTsFcQpR50hORKPrLes1pX4dirbbPPg",
    authDomain: "ecommerce-898b0.firebaseapp.com",
    projectId: "ecommerce-898b0",
    storageBucket: "ecommerce-898b0.appspot.com",
    messagingSenderId: "39037471117",
    appId: "1:39037471117:web:fec507975a526c8e88d5c4"
  };
  // Initialize Firebase
  if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
  }

  //export
  export const auth = firebase.auth();
  export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();