"use client";
import SignupForm from "./components/SignupForm";
import LoginForm from "./components/LoginForm";
import Image from "next/image";
import ssshape from "../../../public/images/ssshape.svg";
import Link from "next/link";
import { useState } from "react";
import Typewriter from "typewriter-effect";

export default function RootPage() {
  const [showLogin, setShowLogin] = useState(true);
  const toggleForm = () => {
    setShowLogin((prev) => !prev);
  };

  return (
    <main className="">
      <div className="overflow-y-hidden">
        <div className="w-screen">
          <div className="navbar p-2 ">
            <div className="flex justify-between">
              <Link href="/" className="btn btn-ghost normal-case text-xl">
                <span className="gradient-text-2 font-extrabold">Pulse.io</span>
              </Link>
            </div>
            <button className="btn btn-outline" onClick={toggleForm}>
              {showLogin ? "Signup" : "Login"}
            </button>
          </div>
        </div>
        <div className="pt-8 w-screen h-screen overflow-hidden">
          <div className="float-box">
            <Image
              src={ssshape}
              alt="bg-hover"
              blurDataURL="data:..."
              automatically={"true"}
              provided={"true"}
              placeholder="blur"
              className="float"
            />
          </div>
          <div className="grid grid-cols-8 gap-1 justify-center items-center hero-section p-8 w-full h-full overflow-y-hidden overflow-x-hidden">
            <div className=" flex justify-start col-span-8 md:col-span-5 p-2">
              <div className=" px-4 h-min flex justify-start  ">
                <div className="  text-5xl font-extrabold grid grid-cols-2 gap-1 ">
                  <div className="gradient-text-1 md:col-span-1 col-span-2 ">
                    Welcome to
                  </div>
                  <div className="px-1 gradient-text-2 md:col-span-1 col-span-2 ">
                    <Typewriter
                      options={{
                        strings: [
                          "Private,",
                          "Powerful,",
                          "Personal,",
                          "Pulse.io...",
                        ],
                        autoStart: true,
                        loop: true,
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className=" flex justify-center items-center col-span-8 md:col-span-3">
              {showLogin ? <LoginForm /> : <SignupForm />}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
