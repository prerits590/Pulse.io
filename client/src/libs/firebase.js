import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCg-2jNvi6UuQnpk_U1_zzyWDt8CB9gh-0",
  authDomain: "chat-app-f7ea2.firebaseapp.com",
  projectId: "chat-app-f7ea2",
  storageBucket: "chat-app-f7ea2.appspot.com",
  messagingSenderId: "999282587655",
  appId: "1:999282587655:web:0c6d9d268aa7575a0fd2a2",
  measurementId: "G-3DVH1ET58J",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore(app);
