import React, { createContext, useContext, useReducer, useState } from "react";
import { GlobalContext } from "./store";
export const ChatContext = createContext();

export const ChatContextProvider = ({ children }) => {
  const { currentUser } = useContext(GlobalContext);
  const INITIAL_STATE = {
    chatId: "null",
    user: {},
  };

  const [chatRoom, setChatRoom] = useState(INITIAL_STATE);

  const updateChatRoom = (payload) => {
    setChatRoom((prevValue) => {
      return {
        user: payload,
        chatId:
          currentUser.uid > payload.uid
            ? currentUser.uid + payload.uid
            : payload.uid + currentUser.uid,
      };
    });
  };

  return (
    <ChatContext.Provider value={{ data: chatRoom, updateChatRoom }}>
      {children}
    </ChatContext.Provider>
  );
};
