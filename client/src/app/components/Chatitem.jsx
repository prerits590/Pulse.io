import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import { BiUser } from "react-icons/bi";
import Ellipse2 from "../../../public/images/Ellipse2.png";
import { doc, onSnapshot } from "firebase/firestore";
import { GlobalContext } from "../../Context/store";
import { db } from "../../libs/firebase";
import { ChatContext } from "../../Context/ChatContext";

export default function Chatitem() {
  const { currentUser } = useContext(GlobalContext);
  const { updateChatRoom } = useContext(ChatContext);
  const [chats, setChats] = useState([]);

  const handleSelect = (u) => {
    updateChatRoom(u); // Pass only the user information
  };

  useEffect(() => {
    const getChats = () => {
      const userChatsRef = doc(db, "userChats", currentUser.uid);

      const unsub = onSnapshot(
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

      return () => {
        unsub();
      };
    };

    if (currentUser && currentUser.uid) {
      getChats();
    }
  }, [currentUser]);

  console.log(Object.entries(chats));
  return (
    <>
      <div className="a px-2 w-full">
        {Object.entries(chats)
          ?.sort((a, b) => b[1].data - a[1].date)
          .map((chat) => (
            <div
              className="a  "
              key={chat[0]}
              onClick={() => handleSelect(chat[1].userInfo)}
            >
              <div className=" ">
                <a
                  href="#"
                  className="btn btn-ghost w-full flex  normal-case p-2 h-full justify-between items-center "
                >
                  <div className=" h-full rounded-full py-2 overflow-hidden ">
                    <Image
                      src={chat[1].userInfo.photoURL}
                      alt="user"
                      blurDataURL="data:..."
                      automatically
                      provided
                      placeholder="blur"
                      className=" w-full h-full object-cover " // Optional blur-up while loading
                      width={45}
                      height={45}
                    />
                  </div>
                  <div className="c justify-center items-center text-left ">
                    <div className="d  text-xs truncate font-medium ">
                      <p>{chat[1].userInfo.displayName}</p>
                    </div>
                    <div className="e   text-xs font-extralight">
                      <p>{chat[1].lastMessage?.text}</p>
                    </div>
                  </div>
                  <div className="f  text-xs font-light">
                    <p>9:36pm</p>
                  </div>
                </a>
              </div>
            </div>
          ))}
      </div>
    </>
  );
}
