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

// OLD FIREBASE SDK
// const firebaseConfig = {
//   apiKey: "AIzaSyCngRNs12aS5un6Jje593LDSqk0VjV66xc",
//   authDomain: "twitter-clone-80caf.firebaseapp.com",
//   projectId: "twitter-clone-80caf",
//   storageBucket: "twitter-clone-80caf.appspot.com",
//   messagingSenderId: "1037949950112",
//   appId: "1:1037949950112:web:3480528c2e4b7edbae11c5",
//   measurementId: "G-8JRHP4VRXT"
// };