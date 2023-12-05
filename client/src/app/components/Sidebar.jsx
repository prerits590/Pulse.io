"use client";
import React, { useContext } from "react";
import { BsChatDots, BsCodeSlash, BsFillGearFill } from "react-icons/bs";
import { BiUserCircle } from "react-icons/bi";
import Budgie from "../../../public/images/Budgie.png";
import Ellipse1 from "../../../public/images/Ellipse1.png";
import Image from "next/image";
import { FiUsers, IconName } from "react-icons/fi";
import { IoMdCall } from "react-icons/io";
import Link from "next/link";
import { GlobalContext } from "../../Context/store";

export default function Sidebar() {
  const { currentUser } = useContext(GlobalContext);

  return (
    <div className="h-screen flex justify-between flex-col">
      <div className=" flex flex-col content-center items-center p-2 font-extrabold text-xl">
        <div className="a my-1 p-1 btn btn-ghost">
          <Image
            src={Budgie}
            alt="bg-hover"
            blurDataURL="data:..."
            automatically
            provided
            placeholder="blur"
            className="a" // Optional blur-up while loading
          />
        </div>
        <div className="divider m-0 py-0 px-6 h-0"></div>
        <div className="b  p-2 my-2">
          <Link href="/" className="btn btn-ghost normal-case text-xl">
            <span className=" font-extrabold">
              <BsChatDots />
            </span>
          </Link>
        </div>
        <div className="b p-2 ">
          <Link href="/" className="btn btn-ghost normal-case text-xl">
            <span className=" font-extrabold">
              <FiUsers />
            </span>
          </Link>
        </div>
        <div className="b  p-2">
          <Link href="/" className="btn btn-ghost normal-case text-xl">
            <span className=" font-extrabold">
              <IoMdCall />
            </span>
          </Link>
        </div>
        <div className="b  p-2 ">
          <Link href="/" className="btn btn-ghost normal-case text-xl">
            <span className=" font-extrabold">
              <BsFillGearFill />
            </span>
          </Link>
        </div>
      </div>
      <div className="flex flex-col p-4 justify-center items-center">
        <div className="d border-2 h-full btn btn-ghost w-full ">
          <div className="avatar p-1 h-full w-full">
            <div className="w-full rounded-full ring ring-red-400 ring-offset-base-100 ring-offset-2">
              <Image
                src={currentUser.photoURL}
                alt="img"
                blurDataURL="data:..."
                automatically
                provided
                placeholder="blur"
                className="" // Optional blur-up while loading
                width={45}
                height={45}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
