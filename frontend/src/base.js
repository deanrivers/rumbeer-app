import * as firebase from "firebase/app";
import "firebase/auth";

// const app = firebase.initializeApp({
//   apiKey: process.env.REACT_APP_FIREBASE_KEY,
//   authDomain: process.env.REACT_APP_FIREBASE_DOMAIN,
//   databaseURL: process.env.REACT_APP_FIREBASE_DATABASE,
//   projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID
// });

var firebaseConfig = {
  apiKey: "AIzaSyB_f99ugu1_kTHQR8ABGVdWGBq5Gqvrvqc",
  authDomain: "rumbeer-app.firebaseapp.com",
  databaseURL: "https://rumbeer-app.firebaseio.com",
  projectId: "rumbeer-app",
  storageBucket: "rumbeer-app.appspot.com",
  messagingSenderId: "312399410061",
  appId: "1:312399410061:web:5aaa74db0cd21846bf43c4",
  measurementId: "G-VP7ESVT3F9"
};
// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
// firebase.analytics();

export default app;