import React from "react";

import Sidebar from "./Sidebar";
import ChatsSection from "./ChatsSection";
import Chatitem from "./Chatitem";
import ChatS from "./ChatS";

function StandardView() {
  return (
    <div className="grid md:grid-cols-12 grid-cols-6 grid-rows-5 gap-1 h-screen ">
      <div className="md:col-span-1 hidden md:block glass-bg rounded-md justify-between flex-col h-screen">
        <Sidebar />
      </div>
      <div className="md:col-span-3 col-span-2 glass-bg h-screen overflow-y-scroll rounded-md">
        <ChatsSection />
        <Chatitem />
      </div>
      <div className="md:col-span-8 col-span-4 glass-bg justify-between  rounded-md h-screen relative overflow-hidden">
        <ChatS />
      </div>
    </div>
  );
}

export default StandardView;
