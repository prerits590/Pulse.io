// layoutFunctions.js
import {
  query,
  collection,
  where,
  getDocs,
  getDoc,
  setDoc,
  updateDoc,
  serverTimestamp,
  doc,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../../../libs/firebase";

export const handleSearch = async (username, setUsername, setUser, setErr) => {
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

export const handleKey = (e, handleSearch) => {
  e.code === "Enter" && handleSearch();
};

export const handleSelectChat = async (
  currentUser,
  user,
  setUsername,
  setUser,
  db
) => {
  const combinedId =
    currentUser.uid > user.uid
      ? currentUser.uid + user.uid
      : user.uid + currentUser.uid;
  console.log("user id", user.uid);
  console.log("current uid", currentUser.uid);

  try {
    const res = await getDoc(doc(db, "chats", combinedId));

    if (!res.exists()) {
      await setDoc(doc(db, "chats", combinedId), { messages: [] });

      const docCheck = await getDoc(doc(db, "userChats", currentUser.uid));
      if (!docCheck.exists()) {
        console.log("FALSE---->>>>>");
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
// This file contains all the functions used in Chatitem.js

export const getChats = async (currentUser, setChats) => {
  const userChatsRef = doc(db, "userChats", currentUser.uid);

  onSnapshot(
    userChatsRef,
    (snapshot) => {
      if (snapshot.exists()) {
        const chatsData = snapshot.data();
        setChats(chatsData);
      } else {
        console.error("Document does not exist for UID:", currentUser.uid);
      }
    },
    (error) => {
      console.error("Error fetching chats:", error);
    }
  );
};

export const handleSelect = (u, updateChatRoom) => {
  updateChatRoom(u);
};
