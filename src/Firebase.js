// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore,collection } from "firebase/firestore";
import { getAuth,GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBwxrdZ7GvLb1uAnBBG1SYNDqEvz_WZ_tQ",
  authDomain: "workplace-8efe9.firebaseapp.com",
  projectId: "workplace-8efe9",
  storageBucket: "workplace-8efe9.appspot.com",
  messagingSenderId: "745546277535",
  appId: "1:745546277535:web:97c17ef34bbb55d7ae78aa",
  measurementId: "G-BC257LXGPE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db=getFirestore(app);
export const auth=getAuth(app);
export const storage=getStorage(app);
export const user=collection(db,"users");

export const provider=new GoogleAuthProvider();
