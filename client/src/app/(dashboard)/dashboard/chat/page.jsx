"use client";
import React from "react";
import Sidebar from "../../../../components/Sidebar";
import ChatsSection from "../../../../components/ChatsSection";
import ChatS from "../../../../components/ChatS";
import { GlobalContext } from "../../../../Context/store";
import withAuth from "./isAuth";
import PrevChats from "../../../../components/PrevChats";

const Page = () => {
  return (
    <>
      <div className="grid md:grid-cols-11 grid-rows-5 gap-1 h-screen ">
        <div className="col-span-1 glass-bg rounded-mdcd  flex justify-between flex-col h-screen">
          <Sidebar />
        </div>
        <div className="col-span-3  glass-bg h-screen overflow-y-scroll rounded-md">
          <PrevChats />
        </div>
        <div className="col-span-7  glass-bg justify-between  rounded-md h-screen relative">
          <ChatS />
        </div>
        {/* <div className="col-span-2  glass-bg h-screen overflow-y-scroll rounded-md">
          <ChatsSection />
        </div> */}
      </div>
    </>
  );
};

export default withAuth(Page);
