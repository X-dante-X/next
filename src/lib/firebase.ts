import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyCcJoqeKeCbJL0ItpNimFnWaDpKyDdUsJQ",
  authDomain: "next-ddee9.firebaseapp.com",
  databaseURL: "https://next-ddee9-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "next-ddee9",
  storageBucket: "next-ddee9.firebasestorage.app",
  messagingSenderId: "752058742173",
  appId: "1:752058742173:web:63045d45d58c2f75c6eb74",
  measurementId: "G-ML3YF3KGWH"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
export { auth, db };