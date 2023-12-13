"use client";
import { doc, onSnapshot } from "firebase/firestore";
import { React, useEffect, useState, useContext } from "react";
import Message from "./Message";
import { ChatContext } from "../../../../Context/ChatContext";
import { db } from "../../../../libs/firebase";

export default function Messages() {
  const [messages, setMessages] = useState();
  const { data } = useContext(ChatContext);
  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
      doc.exists() && setMessages(doc.data().messages);
    });
    return () => {
      unSub;
    };
  }, [data.chatId]);
  console.log("MESSAGES", messages);
  return (
    <div>
      <div
        style={{ height: "90vh" }}
        className="g p-4 overflow-y-scroll"
      >
        {messages?.map((m) => (
          <Message message={m} key={m.id} />
        ))}
      </div>
    </div>
  );
}
