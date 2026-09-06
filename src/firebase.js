import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAKT6IgvPTNOatifMcT1EiBckCW-TjG-LY",
  authDomain: "cac2026-dc2a7.firebaseapp.com",
  projectId: "cac2026-dc2a7",
  storageBucket: "cac2026-dc2a7.firebasestorage.app",
  messagingSenderId: "276247608514",
  appId: "1:276247608514:web:75c036d0110138ba098f5b",
  measurementId: "G-5834RNTDCW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

export const googleProvider = new GoogleAuthProvider();