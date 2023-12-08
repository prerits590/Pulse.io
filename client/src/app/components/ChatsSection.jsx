import React, { useContext, useState } from "react";
import { IoIosNotifications } from "react-icons/io";
import Chatitem from "../components/Chatitem";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../../libs/firebase";
import Image from "next/image";
import { GlobalContext } from "../../Context/store";
export default function ChatsSection() {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);

  const { currentUser } = useContext(GlobalContext);

  const handleSearch = async () => {
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

  const handleKey = (e) => {
    e.code === "Enter" && handleSearch();
  };
  const handleSelect = async () => {
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
        // Create user chats
        const docCheck = await getDoc(doc(db, "userChats", currentUser.uid));
        if (!docCheck.exists()) {
          console.log("FALSE");
        }
        await setDoc(doc(db, "userChats", currentUser.uid), {});

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
  return (
    <div>
      <div className="c flex justify-between p-3 items-center ">
        <div className="a font-extrabold btn normal-case btn-outline btn-accent">
          <h1>Chats</h1>
        </div>

        <div className="btn btn-outline btn-accent">
          <IoIosNotifications />
        </div>
      </div>
      <div className="divider m-0 px-4 pb-4 h-0"></div>
      <div className="e p-2">
        <input
          type="text"
          placeholder="Search..."
          className="input input-bordered input-accent w-full max-w-xs"
          onChange={(e) => setUsername(e.target.value)}
          onKeyDown={handleKey}
          value={username}
        />
      </div>
      <div className="h">
        <div className="f p-4 text-xs">
          <h3>Pinned</h3>
        </div>
        <div className="h ">
          <div className="g">
            {err && <span>User not found</span>}
            {user && (
              <div
                className="a px-2 w-full"
                onClick={(e) => {
                  e.preventDefault();
                  handleSelect();
                }}
              >
                <div className="a  ">
                  <a
                    href="/"
                    className="btn btn-ghost w-full flex  normal-case p-2  border-2 h-full justify-between items-center"
                  >
                    <div className="b ">
                      <Image
                        src={user.photoURL}
                        alt="bg-hover"
                        blurDataURL="data:..."
                        provided
                        placeholder="blur"
                        className="rounded-full w-auto h-auto"
                        width={45}
                        height={45} // Optional blur-up while loading
                      />
                    </div>
                    <div className="c justify-center items-center text-left ">
                      <div className="d  text-xs truncate font-medium ">
                        <p>{user.displayName}</p>
                      </div>
                      <div className="e   text-xs font-extralight">
                        <p>Thanks!</p>
                      </div>
                    </div>
                    <div className="f  text-xs font-light">
                      <p>9:36pm</p>
                    </div>
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
