import React from "react";
import { BiAlarm, BiUserCircle } from "react-icons/bi";
import { IoIosNotifications } from "react-icons/io";
import ChatBubbleL from "../components/ChatBubbleL";
import ChatBubbleR from "../components/ChatBubbleR";
import ChatBox from "../components/ChatBox";
import Ellipse2 from "../../../public/images/Ellipse2.png";
import Image from "next/image";
import { IoCallOutline } from "react-icons/io5";
import { AiOutlineDown, AiOutlineSearch } from "react-icons/ai";
import { BsCameraVideo } from "react-icons/bs";
export default function ChatS() {
  return (
    <div>
      <div className="a rounded-lg flex p-1 items-center ">
        <div className=" h-full flex justify-center items-center px-3">
          <a href="/" className="btn btn-ghost h-full normal-case ">
            <div className="a flex items-center ">
              <div className="b text-3xl h-full py-2">
                <Image
                  src={Ellipse2}
                  alt="bg-hover"
                  blurDataURL="data:..."
                  automatically
                  provided
                  placeholder="blur"
                  className="a" // Optional blur-up while loading
                />
              </div>
              <div className="text-xs px-4 text-left font-medium">
                <div className="c">
                  <p>Pink Panda</p>
                </div>
                <div className="d">
                  <p>Online</p>
                </div>
              </div>
            </div>
          </a>

          <div className="flex justify-end text-2xl px-2">
            <div className="e px-4 btn btn-ghost">
              <BsCameraVideo />
            </div>
            <div className="e px-4 btn btn-ghost">
              <IoCallOutline />
            </div>
            <div className="e px-4 btn btn-ghost">
              <AiOutlineSearch />
            </div>
            <div className="divider divider-horizontal p-0 m-0"></div>
            <div className="e px-4 btn btn-ghost">
              <AiOutlineDown />
            </div>
          </div>
        </div>
      </div>
      <div className="divider m-0 py-0 px-6 h-0"></div>

      <div>
        <div className="g p-4 max-h-screen overflow-y-scroll ">
          <div className="a">
            <ChatBubbleL />
          </div>
          <div className="a">
            <ChatBubbleR />
          </div>
          <div className="a">
            <ChatBubbleR />
          </div>
          <div className="a">
            <ChatBubbleL />
          </div>
          <div className="a">
            <ChatBubbleL />
          </div>
          <div className="a">
            <ChatBubbleL />
          </div>
          <div className="a">
            <ChatBubbleR />
          </div>
          <div className="a">
            <ChatBubbleR />
          </div>
          <div className="a">
            <ChatBubbleR />
          </div>
        </div>
      </div>
      <div className="a bottom-0 ">
        <div className="a absolute bottom-0 p-2 w-full">
          <ChatBox />
        </div>
      </div>
    </div>
  );
}
