import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCKc_N5rJyy8rjRBPXQQdx4But8vjyxVtA",
  authDomain: "movieapp-51c69.firebaseapp.com",
  projectId: "movieapp-51c69",
  storageBucket: "movieapp-51c69.firebasestorage.app",
  messagingSenderId: "650271185558",
  appId: "1:650271185558:web:b0d8db878e75ab831440b7",
  measurementId: "G-KEW40PYXC0"
};


export const app = initializeApp(firebaseConfig);


export const auth = getAuth(app);
export const db = getFirestore(app);


export const analytics = typeof window !== "undefined" ? getAnalytics(app) : null;
