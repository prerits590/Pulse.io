import React from "react";

export default function Navbar() {
  return (
    <>
      <div className="navbar p-2 ">
        <div className="navbar-start">
          <a className="btn btn-ghost normal-case text-xl">
           <span className="gradient-text1 font-extrabold">Pulse.io</span>
          </a>
        </div>
        <div className="navbar-end">
          <a className="btn btn-outline">Login</a>
        </div>
      </div>
    </>
  );
}
