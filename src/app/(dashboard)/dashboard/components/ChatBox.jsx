"use client";
import { React, useContext, useState } from "react";
import { BiSolidSend } from "react-icons/bi";
import {
  Timestamp,
  arrayUnion,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { GlobalContext } from "../../../../Context/store";
import { ChatContext } from "../../../../Context/ChatContext";
import { db, storage } from "../../../../libs/firebase";
import { LuImagePlus } from "react-icons/lu";

export default function ChatBox() {
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);

  const { currentUser } = useContext(GlobalContext);
  const { data } = useContext(ChatContext);
  console.log(data.chatId,"---->>>????");
  const handleSend = async () => {
    if (img) {
      const storageRef = ref(storage, uuidv4());
      const uploadTask = uploadBytesResumable(storageRef, img);

      await uploadBytesResumable(storageRef, img).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {
            //Update profile
            await updateDoc(doc(db, "chats", data.chatId), {
              messages: arrayUnion({
                id: uuidv4(),
                text,
                senderId: currentUser.uid,
                date: Timestamp.now(),
                img: downloadURL,
              }),
            });
          } catch (err) {
            console.log(err);
          }
        });
      });
    } else {
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuidv4(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        }),
      });
    }

    setImg(null);
    setText("");
    await updateDoc(doc(db, "userChats", currentUser.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });
    await updateDoc(doc(db, "userChats", data.user.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });
  };
  return (
    <div className="grid grid-cols-10 gap-1 glass-bg-2">
      <div className="col-span-9  relative text-input-div">
        <div className="w-full ">
          <input
            type="text"
            placeholder="Message..."
            className="input input-bordered input-accent w-full"
            onChange={(e) => setText(e.target.value)}
            value={text}
          />
        </div>
        <div className="add-img-div right-0 w-fit h-full">
          <div className="h-full flex items-center justify-center  w-fit">
            <label
              htmlFor="fileInput"
              className="custom-file-upload text-3xl px-1"
            >
              <input
                type="file"
                id="fileInput"
                className="hidden"
                onChange={(e) => setImg(e.target.files[0])}
              />
              <span className="custom-file-upload-icon flex justify-center">
                <LuImagePlus />
              </span>
            </label>
          </div>
        </div>
      </div>

      <div className="col-span-1 flex justify-center">
        <div className="a text-2xl px-3 py-1 border btn btn-outline btn-accent">
          <button onClick={handleSend}>
            <BiSolidSend />
          </button>
        </div>
      </div>
    </div>
  );
}
