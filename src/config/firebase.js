// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBQ8wxaGfzcEezXRqwmcPnAl86NYuefVYg",
  authDomain: "vite-contact-c590b.firebaseapp.com",
  projectId: "vite-contact-c590b",
  storageBucket: "vite-contact-c590b.appspot.com",
  messagingSenderId: "248749542167",
  appId: "1:248749542167:web:bed46388de1d307bd8c552"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig); 
export const db = getFirestore(app)