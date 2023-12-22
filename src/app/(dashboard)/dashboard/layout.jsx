"use client";
import React, { Children, useContext, useEffect, useState } from "react";
import ChatsSection from "./components/ChatsSection";
import Chatitem from "./components/Chatitem";
import { BsChatDots, BsFillGearFill } from "react-icons/bs";
import Budgie from "../../../../public/images/Budgie.png";
import Image from "next/image";
import { FiUsers } from "react-icons/fi";
import { IoMdCall } from "react-icons/io";
import Link from "next/link";
import { IoIosNotifications } from "react-icons/io";
import { GlobalContext } from "../../../Context/store";
import userPng from "../../../../public/images/userPng.png";
import {
  handleSearch,
  handleKey,
  handleSelect,
  handleSelectChat,
  getChats,
} from "./methods";
import { ChatContext } from "../../../Context/ChatContext";

export default function layout({ children}) {
  const { currentUser } = useContext(GlobalContext);
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);
  const { updateChatRoom } = useContext(ChatContext);
  const [chats, setChats] = useState([]);

  // useEffect(() => {
  //   if (currentUser && currentUser.uid) {
  //     getChats(currentUser, setChats);
  //   }
  // }, [currentUser]);
  // console.log(props);

  return (
    // <>
    //   <div className="grid md:grid-cols-11 grid-cols-6 grid-rows-5 gap-1 h-screen">
    //     <div className="md:col-span-1 hidden md:block glass-bg rounded-md justify-between flex-col h-screen">
    //       {/* SIDEBAR-------->>>>>>>>>> */}
    //       <div className="h-screen flex justify-between flex-col">
    //         <div className=" flex flex-col content-center items-center p-2 font-extrabold text-xl">
    //           <div className="a my-1 p-1 btn btn-ghost">
    //             <Image
    //               src={Budgie}
    //               alt="bg-hover"
    //               blurDataURL="data:..."
    //               automatically
    //               provided
    //               placeholder="blur"
    //               className="a" // Optional blur-up while loading
    //             />
    //           </div>
    //           <div className="divider m-0 py-0 px-6 h-0"></div>
    //           <div className="b  p-2 my-2">
    //             <Link href="#" className="btn btn-ghost normal-case text-xl">
    //               <span className=" font-extrabold">
    //                 <BsChatDots />
    //               </span>
    //             </Link>
    //           </div>
    //           <div className="b p-2 ">
    //             <Link href="#" className="btn btn-ghost normal-case text-xl">
    //               <span className=" font-extrabold">
    //                 <FiUsers />
    //               </span>
    //             </Link>
    //           </div>
    //           <div className="b  p-2">
    //             <Link href="#" className="btn btn-ghost normal-case text-xl">
    //               <span className=" font-extrabold">
    //                 <IoMdCall />
    //               </span>
    //             </Link>
    //           </div>
    //           <div className="b  p-2 ">
    //             <Link href="#" className="btn btn-ghost normal-case text-xl">
    //               <span className=" font-extrabold">
    //                 <BsFillGearFill />
    //               </span>
    //             </Link>
    //           </div>
    //         </div>
    //         <div>
    //           <div className="flex flex-col px-4 justify-center  items-center">
    //             <div className="d h-full p-3 my-1 btn btn-ghost w-full ">
    //               <div className="avatar px-1 h-full w-full">
    //                 <div className="w-full h-full my-1 rounded-full ring ring-red-400 ring-offset-base-100 ring-offset-2">
    //                   <Image
    //                     src={currentUser?.photoURL || userPng}
    //                     alt="img"
    //                     blurDataURL="data:..."
    //                     automatically
    //                     provided
    //                     placeholder="blur"
    //                     className="w-full object-cover" // Optional blur-up while loading
    //                     width={45}
    //                     height={45}
    //                   />
    //                 </div>
    //               </div>
    //               <div className=" w-full  flex justify-center">
    //                 <p>{currentUser?.displayName || "User"}</p>
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //     <div className="md:col-span-3 col-span-2 glass-bg h-screen overflow-y-scroll rounded-md">
    //       {/* CHATSSECTION---->>>>>> */}

    //       <div className="">
    //         <div className="c flex justify-between p-3 items-center ">
    //           <div className="a font-extrabold btn normal-case btn-outline btn-accent">
    //             <h1>Chats</h1>
    //           </div>

    //           <div className="btn btn-outline btn-accent">
    //             <IoIosNotifications />
    //           </div>
    //         </div>
    //         <div className="divider m-0 px-4 pb-4 h-0"></div>
    //         <div className="e p-2">
    //           <input
    //             type="text"
    //             placeholder="Search..."
    //             className="input input-bordered input-accent w-full max-w-xs"
    //             onChange={(e) => setUsername(e.target.value)}
    //             onKeyDown={(e) =>
    //               handleKey(e, () =>
    //                 handleSearch(username, setUsername, setUser, setErr)
    //               )
    //             }
    //             value={username}
    //           />
    //         </div>
    //         <div className="h">
    //           <div className="f p-4 text-xs">
    //             <h3>Pinned</h3>
    //           </div>
    //           <div className="h ">
    //             <div className="g">
    //               {err && <span>User not found</span>}
    //               {user && (
    //                 <div
    //                   className="a px-2 w-full"
    //                   onClick={(e) => {
    //                     e.preventDefault();
    //                     handleSelectChat();
    //                   }}
    //                 >
    //                   <div className="a  ">
    //                     <button className="btn btn-ghost w-full flex  normal-case p-2  border-2 h-full justify-between items-center">
    //                       <div className="b ">
    //                         <Image
    //                           src={user.photoURL}
    //                           alt="bg-hover"
    //                           blurDataURL="data:..."
    //                           provided
    //                           placeholder="blur"
    //                           className="rounded-full w-auto h-auto border"
    //                           width={45}
    //                           height={45} // Optional blur-up while loading
    //                         />
    //                       </div>
    //                       <div className="c justify-center items-center text-left ">
    //                         <div className="d  text-xs truncate font-medium ">
    //                           <p>{user.displayName}</p>
    //                         </div>
    //                         <div className="e   text-xs font-extralight">
    //                           <p>Thanks!</p>
    //                         </div>
    //                       </div>
    //                       <div className="f  text-xs font-light">
    //                         <p>9:36pm</p>
    //                       </div>
    //                     </button>
    //                   </div>
    //                 </div>
    //               )}
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //       {/* Chatitem------->>>>>>>>>>>>> */}

    //       <div className="a px-2 w-full">
    //         {Object.entries(chats)
    //           ?.sort((a, b) => b[1].data - a[1].date)
    //           .map((chat) => (
    //             <div
    //               className="a  "
    //               key={chat[0]}
    //               onClick={() => handleSelect(chat[1].userInfo, updateChatRoom)}
    //             >
    //               <div className=" ">
    //                 <button className="btn btn-ghost w-full flex  normal-case p-2 h-full justify-between items-center ">
    //                   <div className="border">
    //                     <div className=" h-full rounded-full py-2 overflow-hidden border">
    //                       <Image
    //                         src={chat[1].userInfo.photoURL}
    //                         alt="user"
    //                         blurDataURL="data:..."
    //                         automatically
    //                         provided
    //                         placeholder="blur"
    //                         className=" w-1/2" // Optional blur-up while loading
    //                         width={45}
    //                         height={45}
    //                       />
    //                     </div>
    //                   </div>
    //                   <div className="c justify-center items-center text-left ">
    //                     <div className="d  text-xs truncate font-medium ">
    //                       <p>{chat[1].userInfo.displayName}</p>
    //                     </div>
    //                     <div className="e   text-xs font-extralight">
    //                       <p>{chat[1].lastMessage?.text}</p>
    //                     </div>
    //                   </div>
    //                   <div className="f  text-xs font-light">
    //                     <p>9:36pm</p>
    //                   </div>
    //                 </button>
    //               </div>
    //             </div>
    //           ))}
    //       </div>
    //     </div>
    //     {children}
    //   </div>
    // </>
    <div>

      { children }
    </div>
  );
}
