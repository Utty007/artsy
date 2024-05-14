import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
export const firebaseConfig = {
  apiKey: "AIzaSyBFsOSznYqHmqRWviaPqxIO_nbPLxRuqRw",
  authDomain: "artsy-auth-project.firebaseapp.com",
  projectId: "artsy-auth-project",
  storageBucket: "artsy-auth-project.appspot.com",
  messagingSenderId: "893850308872",
  appId: "1:893850308872:web:e9fb41d344478221e31cbd",
  databaseURL: "https://artsy-auth-project-default-rtdb.firebaseio.com/",
};

export const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
