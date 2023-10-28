import React from "react";
import { IoIosNotifications } from "react-icons/io";
import Chatitem from "../components/Chatitem";
export default function ChatsSection() {
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
        />
      </div>
      <div className="h">
        <div className="f p-4 text-xs">
          <h3>Pinned</h3>
        </div>
        <div className="h ">
          <div className="g">
            <Chatitem />
          </div>
          <div className="g">
            <Chatitem />
          </div>
        </div>
      </div>
      <div className="h">
        <div className="f p-4 text-xs">
          <h3>All Chats</h3>
        </div>
        <div className="h">
          <div className="g">
            <Chatitem />
          </div>
          <div className="g">
            <Chatitem />
          </div>
          <div className="g">
            <Chatitem />
          </div>
          <div className="g">
            <Chatitem />
          </div>
        </div>
      </div>
    </div>
  );
}
