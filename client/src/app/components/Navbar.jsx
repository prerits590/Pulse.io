import Link from "next/link";
import React from "react";

export default function Navbar() {
  return (
    <>
      <div className="navbar p-2 ">
        <div className="navbar-start">
          <Link href="/" className="btn btn-ghost normal-case text-xl">
           <span className="gradient-text1 font-extrabold">Pulse.io</span>
          </Link>
        </div>
        <div className="navbar-end">
          <a className="btn btn-outline">Login</a>
        </div>
      </div>
    </>
  );
}
