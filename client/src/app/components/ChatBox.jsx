import { React, useContext, useState } from "react";
import { BiSolidSend } from "react-icons/bi";
import { GlobalContext } from "../../Context/store";
import { ChatContext } from "../../Context/ChatContext";
import {
  Timestamp,
  arrayUnion,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "../../libs/firebase";
import { v4 as uuidv4 } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

export default function ChatBox() {
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);

  const { currentUser } = useContext(GlobalContext);
  const { data } = useContext(ChatContext);

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
  setImg(null);
  setText("");
  return (
    <div className=" p-2 flex items-center justify-between w-full ">
      <div className="w-full">
        <input
          type="text"
          placeholder="Message..."
          className="input input-bordered input-accent w-full "
          onChange={(e) => setText(e.target.value)}
          value={text}
        />
      </div>
      <div className="">
        <input
          type="file"
          className=" "
          onChange={(e) => setImg(e.target.files[0])}
        />
      </div>
      <div className="a text-2xl btn btn-outline btn-accent">
        <button onClick={handleSend}>
          <BiSolidSend />
        </button>
      </div>
    </div>
  );
}
