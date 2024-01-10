"use client";
import React, { useContext } from "react";
import { BsChatDots, BsCodeSlash, BsFillGearFill } from "react-icons/bs";
import Image from "next/image";
import { FiUsers, IconName } from "react-icons/fi";
import { IoMdCall } from "react-icons/io";
import Link from "next/link";

import { GlobalContext } from "../../../../Context/store";

import userPng from "../../../../../public/images/userPng.png";
export default function Sidebar() {
  const { currentUser } = useContext(GlobalContext);

  return (
    <div className="h-screen p-0 flex justify-between flex-col">
      <div className=" flex flex-col content-center items-center p-2 font-extrabold text-xl">
        <div className="a my-1 p-2 btn btn-ghost ">
          <span className="gradient-text-2 font-extrabold lg:text-lg text-sm p-1 w-full ">
            Pulse.io
          </span>
        </div>
        <div className="divider m-0 py-0 px-6 h-0"></div>
        <div className="b  p-2 my-2">
          <Link href="#" className="btn btn-ghost normal-case text-xl">
            <span className=" font-extrabold">
              <BsChatDots />
            </span>
          </Link>
        </div>
        <div className="b p-2 ">
          <Link href="#" className="btn btn-ghost normal-case text-xl">
            <span className=" font-extrabold">
              <FiUsers />
            </span>
          </Link>
        </div>
        <div className="b  p-2">
          <Link href="#" className="btn btn-ghost normal-case text-xl">
            <span className=" font-extrabold">
              <IoMdCall />
            </span>
          </Link>
        </div>
        <div className="b  p-2 ">
          <Link href="#" className="btn btn-ghost normal-case text-xl">
            <span className=" font-extrabold">
              <BsFillGearFill />
            </span>
          </Link>
        </div>
      </div>
      <div>
        <div className="flex flex-col px-2 justify-center  items-center">
          <div className="d h-full md:p-4 p-1 my-1 btn btn-ghost w-full ">
            <div className="avatar px-1 h-full w-full">
              <div className="w-full h-full my-1 rounded-full ring ring-red-400 ring-offset-base-100 ring-offset-2">
                <Image
                  src={currentUser?.photoURL || userPng}
                  alt="img"
                  blurDataURL="data:..."
                  automatically={"true"}
                  provided={"true"}
                  placeholder="blur"
                  className="w-full  object-cover" // Optional blur-up while loading
                  width={45}
                  height={45}
                />
              </div>
            </div>
            <div className=" w-full  flex justify-center">
              <p>{currentUser?.displayName || "User"}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
