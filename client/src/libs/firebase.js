
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCO5Pa2wnR_EEwsNBAT0XG6_9WXr8d2ChM",
  authDomain: "chat-app-mern-2b78f.firebaseapp.com",
  projectId: "chat-app-mern-2b78f",
  storageBucket: "chat-app-mern-2b78f.appspot.com",
  messagingSenderId: "372281267025",
  appId: "1:372281267025:web:24bf1d18ece8331b4cf970",
  measurementId: "G-TNDYHPL60K"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth()
export const storage = getStorage();
