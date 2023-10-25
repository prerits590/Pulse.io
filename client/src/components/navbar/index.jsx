import React from "react";

export default function Navbar() {
  return (
    <>
      <div className="navbar bg-base-100 p-2">
        <div className="navbar-start">
          <a className="btn btn-ghost normal-case text-xl">daisyUI</a>
        </div>
        <div className="navbar-end">
          <a className="btn">Button</a>
        </div>
      </div>
    </>
  );
}
