"use client";
import { React, useContext, useRef, useEffect, useState } from "react";
import { GlobalContext } from "../../../../Context/store";

export default function Message(message) {
  const { currentUser } = useContext(GlobalContext);
  // const { data } = useContext(ChatContext);
  const ref = useRef();
  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);
  console.log(message.message.senderId, "MESSAGE---->>>>");
  console.log(currentUser.uid, "MESSAGE---->>>>11111");
  console.log(message, "MESSAGEEEE");
  const [chatFlag, setChatFlag] = useState(false);

  useEffect(() => {
    currentUser.uid == message.message.senderId
      ? setChatFlag(true)
      : setChatFlag(false);
    console.log(setChatFlag, "FLAG--->>>>");
  }, [currentUser.uid, message.message.senderId]);
  console.log(setChatFlag, "FLAG---->>>>");
  return (
    <div>
      <div
        className={`message ${
          message.message.senderId == currentUser.uid && "owner"
        }`}
      >
        {chatFlag ? (
          <div className="messageContent">
            <div className="chat chat-end">
              <div className="chat-bubble-primary p-2 rounded-2xl">
                {message.message.text && <p>{message.message.text}</p>}
                {message.message.img && (
                  <img src={message.message.img} alt="" />
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="messageContent">
            <div className="chat chat-start">
              <div className="chat-bubble-secondary p-2 rounded-2xl">
                {message.message.text && <p>{message.message.text}</p>}
                {message.message.img && (
                  <img src={message.message.img} alt="" />
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
