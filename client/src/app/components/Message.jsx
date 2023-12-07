"use client";
import { React, useContext, useRef, useEffect } from "react";
import ChatBubbleL from "./ChatBubbleL";
import { GlobalContext } from "../../Context/store";
import { ChatContext } from "../../Context/ChatContext";
import Messages from "./Messages";

export default function Message(message) {
  const { currentUser } = useContext(GlobalContext);
  const { data } = useContext(ChatContext);
  const ref = useRef();
  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  return (
    <div>
      <div
        className={`message ${message.senderId == currentUser.uid && "owner"}`}
      >
        <div className="messageInfo">
          <img
            src={
              message.senderId == currentUser.uid
                ? currentUser.photoURL
                : data.user.photoURL
            }
            alt=""
          />
          <span>just now</span>
        </div>
        <div className="messageContent">
          <div className="chat chat-start">
            <div className="chat-bubble-primary">
              {message.text && <p>{message.text}</p>}
              {message.img && <img src={message.img} alt="" />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
