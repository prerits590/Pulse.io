import SignupForm from "./components/SignupForm";
import LoginForm from "./components/LoginForm";
import Image from "next/image";
import ssshape from "../../../public/images/ssshape.svg";
import Link from "next/link";

export default function RootPage() {
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
            {/* <button className="btn btn-outline" onClick={toggleForm}>
                {showLogin ? "Signup" : "Login"}
              </button> */}
          </div>
        </div>
        <div className="pt-8 w-screen h-screen overflow-hidden">
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
          <div className="grid grid-cols-8 gap-1 justify-center items-center hero-section p-8 w-full h-full overflow-y-hidden overflow-x-hidden">
            <div className=" flex justify-start col-span-8 md:col-span-5 p-2">
              <div className=" px-4 h-min flex justify-center">
                <article className="prose md:prose-xl">
                  {/* <h1>
                <span className="gradient-text2">Lorem,</span> <span className="gradient-text1">ipsum dolor.</span>
              </h1>
              <h3>Lorem ipsum, dolor sit amet consectetur adipisicing.</h3> */}
                  <div className=" w-min h-min ">
                    <h1 className="gradient-text2 m-2">Lorem</h1>
                  </div>
                  <div className=" w-min truncate h-min">
                    <h1 className="gradient-text1 m-2">Lorem ipsum dolor.</h1>
                  </div>
                </article>
              </div>
            </div>
            <div className=" flex justify-center items-center col-span-8 md:col-span-3">
              {/* {showLogin ? <LoginForm /> : <SignupForm />} */}
              {/* <LoginForm /> */}
              <LoginForm />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
