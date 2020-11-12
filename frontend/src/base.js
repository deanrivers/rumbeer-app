import * as firebase from "firebase/app";
import "firebase/auth";

var firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: process.env.REACT_APP_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_SENDER_ID,
  appId: process.env.REACT_APP_SENDER_APP_ID,
  measurementId: process.env.REACT_APP_SENDER_MEASUREMENT_ID
};
// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

export default app;