// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAVg6Ya1rPo9_1f1aRD1nmpUCn-nfhAR6k",
  authDomain: "writing-22032.firebaseapp.com",
  databaseURL: "https://writing-22032-default-rtdb.firebaseio.com",
  projectId: "writing-22032",
  storageBucket: "writing-22032.appspot.com",
  messagingSenderId: "413062129590",
  appId: "1:413062129590:web:c437affc3b182166948317",
  measurementId: "G-L6H7BGK0Z7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
