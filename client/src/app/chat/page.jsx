import React from "react";
import { BsCodeSlash } from "react-icons/bs";

export default function Page() {
  return (
    <>
      <div className="grid md:grid-cols-11 grid-rows-5 gap-1">
        <div className="col-span-1 border-2">
          <div className="border-2 flex flex-col content-center items-center p-2 font-extrabold text-2xl ">
            <div className="a border-2 p-2 my-3">
              <BsCodeSlash />
            </div>
            <div className="b border-2 p-2 my-3">
              <BsCodeSlash />
            </div>
            <div className="b  border-2 p-2 my-3">
              <BsCodeSlash />
            </div>
            <div className="b border-2 p-2 my-3">
              <BsCodeSlash />
            </div>
            <div className="b border-2 p-2 my-3">
              <BsCodeSlash />
            </div>
          </div>
          
        </div>
        <div className="col-span-3 border-2">1</div>
        <div className="col-span-4 border-2">1</div>{" "}
        <div className="col-span-3 border-2">1</div>
      </div>
    </>
  );
}
