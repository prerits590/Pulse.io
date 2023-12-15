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
    <div className="glass-bg-2">
      <div className=" ">
        <div>
          <button onClick={openTab} className="btn btn-ghost">
            <CiMenuFries />
          </button>
        </div>
        {isTabOpen && (
          <div>
            <div className="h-screen">
              <button onClick={closeTab} className="btn btn-ghost">
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
