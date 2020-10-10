import * as firebase from "firebase/app";
import "firebase/auth";

var firebaseConfig = {
  apiKey: "AIzaSyBWtxXs1VVgSsKUKNIvUOmMgpuSagD9pv8",
  authDomain: "rumbeer-dda6f.firebaseapp.com",
  databaseURL: "https://rumbeer-dda6f.firebaseio.com",
  projectId: "rumbeer-dda6f",
  storageBucket: "rumbeer-dda6f.appspot.com",
  messagingSenderId: "884743176160",
  appId: "1:884743176160:web:82ad6a455ed9a8e7baf585",
  measurementId: "G-45DZSXSVR2"
};
// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

export default app;