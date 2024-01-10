"use client";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { useContext, useState } from "react";
import { GlobalContext } from "../Context/store";
import { ChatContext } from "../Context/ChatContext";

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
// This file contains all the functions used in layout.js
// const { currentUser } = useContext(GlobalContext);
// const { data } = useContext(ChatContext);

export const handleSearch = async (username) => {
  const [err, setErr] = useState(false);
  const [user, setUser] = useState(null);
  const q = query(
    collection(db, "users"),
    where("displayName", "==", username)
  );

  try {
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      console.log(doc.id, "=>", doc.data());
      setUser(doc.data());
    });
  } catch (err) {
    setErr(true);
    console.log(err);
  }
};

export const handleKey = (e) => {
  const [username, setUsername] = useState("");
  e.code === "Enter" && handleSearch(username);
};

export const handleSelectChat = async () => {
  const [username, setUsername] = useState("");
  // check if group exists or not, if not create new
  const combinedId =
    currentUser.uid > user.uid
      ? currentUser.uid + user.uid
      : user.uid + currentUser.uid;
  console.log("user id", user.uid);
  console.log("current uid", currentUser.uid);

  try {
    const res = await getDoc(doc(db, "chats", combinedId));

    if (!res.exists()) {
      // The document doesn't exist, so create a new one
      await setDoc(doc(db, "chats", combinedId), { messages: [] });
      // Create user chats
      const docCheck = await getDoc(doc(db, "userChats", currentUser.uid));
      if (!docCheck.exists()) {
        await setDoc(doc(db, "userChats", currentUser.uid), {});
        await setDoc(doc(db, "userChats", user.uid), {});
      }

      await updateDoc(doc(db, "userChats", currentUser.uid), {
        [combinedId + ".userInfo"]: {
          uid: user.uid,
          displayName: user.displayName,
          photoURL: user.photoURL,
        },
        [combinedId + ".date"]: serverTimestamp(),
      });

      await updateDoc(doc(db, "userChats", user.uid), {
        [combinedId + ".userInfo"]: {
          uid: currentUser.uid,
          displayName: currentUser.displayName,
          photoURL: currentUser.photoURL,
        },
        [combinedId + ".date"]: serverTimestamp(),
      });
    }
  } catch (err) {
    console.error("Error checking or creating chat document:", err);
  }
  setUser(null);
  setUsername("");
};

export const handleSelect = (u) => {
  updateChatRoom(u);
};
