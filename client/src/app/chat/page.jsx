

import React from "react";
import Sidebar from "../components/Sidebar";
import ChatsSection from "../components/ChatsSection";
import ChatS from "../components/ChatS";
import { GlobalContext } from "../../Context/store";

export default function Page() {
 
  return (
    <>
      <div className="grid md:grid-cols-11 grid-rows-5 gap-1 h-screen ">
        <div className="col-span-1 glass-bg rounded-mdcd  flex justify-between flex-col h-screen">
          <Sidebar />
        </div>
        <div className="col-span-2  glass-bg h-screen overflow-y-scroll rounded-md">
          <ChatsSection />
        </div>
        <div className="col-span-6  glass-bg justify-between  rounded-md h-screen relative">
          <ChatS />
        </div>
        <div className="col-span-2  glass-bg h-screen overflow-y-scroll rounded-md">
          <ChatsSection />
        </div>
       
      </div>
    </>
  );
}
