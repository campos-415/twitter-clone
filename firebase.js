// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyBIeCM0K3J9mK3A47AxDbPWpTFeVEU5pw0",
  authDomain: "chatapp-3edca.firebaseapp.com",
  projectId: "chatapp-3edca",
  storageBucket: "chatapp-3edca.appspot.com",
  messagingSenderId: "270067846421",
  appId: "1:270067846421:web:b3316cfc0e4561ae842d1c",
  measurementId: "G-BMKV7NKHF7"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();

export default app;
export { db, storage };

