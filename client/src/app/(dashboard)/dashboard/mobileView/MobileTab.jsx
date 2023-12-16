import React, { useState } from "react";
import ChatsSection from "../components/ChatsSection";
import Chatitem from "../components/Chatitem";
import { CiMenuFries } from "react-icons/ci";
import { IoMdClose } from "react-icons/io";

export default function () {
  const [isTabOpen, setIsTabOpen] = useState(false);
  const openTab = () => {
    setIsTabOpen(true);
  };
  const closeTab = () => {
    setIsTabOpen(false);
  };
  return (
    <div className="">
      <div className=" h-full ">
        <div className=" py-3 ">
          <button onClick={openTab} className="btn btn-ghost  glass-bg-2">
            <CiMenuFries />
          </button>
        </div>
        {isTabOpen && (
          <div>
            <div className="h-screen glass-bg-2">
              <button onClick={closeTab} className="btn btn-ghost glass-bg-2">
                <IoMdClose />
              </button>
              <ChatsSection />
              <Chatitem />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
