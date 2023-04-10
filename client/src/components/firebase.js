// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getStorage} from 'firebase/storage'


// import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC-yYmzq3BT2Q7Pkgqh3d8NhwDVKYPxbsM",
  authDomain: "cuba-goa.firebaseapp.com",
  projectId: "cuba-goa",
  storageBucket: "cuba-goa.appspot.com",
  messagingSenderId: "1015733134617",
  appId: "1:1015733134617:web:6853d960f7606af7771188",
  measurementId: "G-DL3673EFZF"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage  = getStorage()
// const analytics = getAnalytics(app);