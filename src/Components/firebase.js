// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBNIBsYhDnSg3KV20ByMLNTlWvk4IRReUs",
  authDomain: "photofolioapp-3c0c3.firebaseapp.com",
  projectId: "photofolioapp-3c0c3",
  storageBucket: "photofolioapp-3c0c3.appspot.com",
  messagingSenderId: "437053218639",
  appId: "1:437053218639:web:5c02e6d2ab7c76e78d6f3a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export {db};
