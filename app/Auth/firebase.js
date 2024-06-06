import { initializeApp } from "firebase/app";

export const firebaseConfig = {
  apiKey: "AIzaSyBFsOSznYqHmqRWviaPqxIO_nbPLxRuqRw",
  authDomain: "artsy-auth-project.firebaseapp.com",
  projectId: "artsy-auth-project",
  storageBucket: "gs://artsy-auth-project.appspot.com",
  messagingSenderId: "893850308872",
  appId: "1:893850308872:web:e9fb41d344478221e31cbd",
  databaseURL: "https://artsy-auth-project-default-rtdb.firebaseio.com/",
};

export const app = initializeApp(firebaseConfig);
