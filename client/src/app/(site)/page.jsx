"use client";
import SignupForm from "./components/SignupForm";
import LoginForm from "./components/LoginForm";
import Image from "next/image";
import ssshape from "../../../public/images/ssshape.svg";
import Link from "next/link";
import { useState } from "react";
import Typewriter from "typewriter-effect";

export default function RootPage() {
  const [showLogin, setShowLogin] = useState(<SignupForm />);
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
                <span className="gradient-text1 font-extrabold">Pulse.io</span>
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
              className="float" // Optional blur-up while loading
            />
          </div>
          <div className="grid grid-cols-8 gap-1 justify-center items-center hero-section p-8 w-full h-full overflow-y-hidden overflow-x-hidden">
            <div className=" flex justify-start col-span-8 md:col-span-5 p-2">
              <div className=" px-4 h-min flex justify-center">
                <div className="flex flex-wrap">
                  <div
                    style={{
                      fontSize: "50px",
                      fontWeight: "800",
                      background:
                        " linear-gradient(to right, #009fff, #ec2f4b)",
                      backgroundClip: "text",
                      WebkitBackgroundClip: "text",
                      color: "transparent",
                    }}
                  >
                    Welcome to
                  </div>
                  <div
                    className="px-2"
                    style={{
                      fontSize: "50px",
                      fontWeight: "800",
                      background:
                        " linear-gradient(to left, #009fff, #ec2f4b)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    <Typewriter
                      options={{
                        strings: [
                          "Private,",
                          "Powerful,",
                          "Personalized,",
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
