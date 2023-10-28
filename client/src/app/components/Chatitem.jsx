import Image from "next/image";
import React from "react";
import { BiUser } from "react-icons/bi";
import Ellipse2 from "../../../public/images/Ellipse2.png";

export default function Chatitem() {
  return (
    <>
      <div className="a px-2 w-full">
        <div className="a  ">
          <a
            href="/"
            className="btn btn-ghost w-full flex  normal-case p-2 rounded-lg border-2 h-full justify-between items-center"
          >
            <div className="b ">
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
            <div className="c justify-center items-center text-left ">
              <div className="d  text-xs truncate font-medium ">
                <p>Pink Panda</p>
              </div>
              <div className="e   text-xs font-extralight">
                <p>Thanks!</p>
              </div>
            </div>
            <div className="f  text-xs font-light">
              <p>9:36pm</p>
            </div>
          </a>
        </div>
      </div>
      <div className="divider m-0 py-0 px-6 h-0"></div>
    </>
  );
}
