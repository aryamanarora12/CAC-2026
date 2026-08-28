
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import {
  getAuth,
  GoogleAuthProvider,
  setPersistence,
  browserLocalPersistence
} from "firebase/auth";

import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAKT6IgvPTNOatifMcT1EiBckCW-TjG-LY",
  authDomain: "cac2026-dc2a7.firebaseapp.com",
  projectId: "cac2026-dc2a7",
  storageBucket: "cac2026-dc2a7.firebasestorage.app",
  messagingSenderId: "276247608514",
  appId: "1:276247608514:web:75c036d0110138ba098f5b",
  measurementId: "G-5834RNTDCW"
};

const app = initializeApp(firebaseConfig);

const analytics = getAnalytics(app);

export const auth = getAuth(app);

setPersistence(auth, browserLocalPersistence)
  .then(() => {
    console.log("Firebase Auth persistence enabled");
  })
  .catch((error) => {
    console.error("Firebase persistence error:", error);
  });

export const db = getFirestore(app);

export const googleProvider = new GoogleAuthProvider();