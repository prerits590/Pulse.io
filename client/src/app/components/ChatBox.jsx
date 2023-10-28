import React from "react";
import { BiSolidSend } from "react-icons/bi";

export default function ChatBox() {
  return (
    <div className=" p-2 flex items-center justify-between w-full ">
      <div className="w-full">
        <input
          type="text"
          placeholder="Message..."
          className="input input-bordered input-accent w-full "
        />
      </div>
      <div className="a text-2xl btn btn-outline btn-accent">
        <BiSolidSend />
      </div>
    </div>
  );
}
