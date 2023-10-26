import React from "react";
import Form from "../form";
import Image from "next/image";
import ssshape from "../../../public/images/ssshape.svg";

export default function Hero() {
  return (
    <div className=" flex justify-centercd">
      <div className="float-box">
        <Image
          src={ssshape}
          alt="bg-hover"
          blurDataURL="data:..."
          automatically
          provided
          placeholder="blur"
          className="float" // Optional blur-up while loading
        />
      </div>
      <div className="grid md:grid-cols-8 gap-4 justify-center items-center hero-section p-8">
        <div className=" flex justify-start col-span-5 p-8  ">
          <div className=" p-4 ">
            <article className="prose md:prose-xl">
              {/* <h1>
                <span className="gradient-text2">Lorem,</span> <span className="gradient-text1">ipsum dolor.</span>
              </h1>
              <h3>Lorem ipsum, dolor sit amet consectetur adipisicing.</h3> */}
              <div className="border-2 w-min h-min ">
                <h1 className="gradient-text2">Lorem</h1>
              </div>
              <div className="border-2 w-min truncate h-min">
                <h1 className="gradient-text1">ipsum dolor.</h1>
              </div>
            </article>
          </div>
        </div>
        <div className=" flex justify-center col-span-3 p-8">
          <Form />
        </div>
      </div>
    </div>
  );
}
