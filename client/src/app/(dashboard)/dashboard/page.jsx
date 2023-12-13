import React from "react";
import Sidebar from "./components/Sidebar";
import PrevChats from "./components/PrevChats";
import ChatS from "./components/ChatS";
import ChatsSection from "./components/ChatsSection";
import Chatitem from "./components/Chatitem";

function page() {
  return (
    <div className="grid md:grid-cols-11 grid-cols-6 grid-rows-5 gap-1 h-screen ">
      <div className="md:col-span-1 hidden md:block glass-bg rounded-md justify-between flex-col h-screen">
        <Sidebar />
      </div>
      <div className="md:col-span-3 col-span-2 glass-bg h-screen overflow-y-scroll rounded-md">
        <ChatsSection />
        <Chatitem />
      </div>
      <div className="md:col-span-7 col-span-4 glass-bg justify-between  rounded-md h-screen relative overflow-hidden">
        <ChatS />
      </div>
      {/* <div className="col-span-2  glass-bg h-screen overflow-y-scroll rounded-md">
          <ChatsSection />
        </div> */}
    </div>
  );
}

export default page;
