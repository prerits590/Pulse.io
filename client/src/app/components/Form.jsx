import Link from "next/link";
import React from "react";

export default function Form() {
  return (
    <div className="p-2 ">
      <form className="form p-6">
      <section className="bg-stars ">
          <span className="star"></span>
          <span className="star"></span>
          <span className="star"></span>
          <span className="star"></span>
        </section>
        <p className="title">Register </p>

        <div className="flex ">
          <label>
            <input
              className="input"
              type="text"
              placeholder="First Name"
              required=""
            />
          </label>

          <label>
            <input
              className="input"
              type="text"
              placeholder="Last Name"
              required=""
            />
          </label>
        </div>

        <label >
          <input
            className="input"
            type="email"
            placeholder="Email"
            required=""
          />
        </label>

        <label>
          <input
            className="input"
            type="password"
            placeholder="Password"
            required=""
          />
        </label>
        <label>
          <input
            className="input"
            type="password"
            placeholder="Confirm Password"
            required=""
          />
        </label>
        <button className="submit btn btn-primary">
          <Link href="/client/src/app/chat/page.jsx">Submit</Link>
        </button>
        <p className="signin">
          Already have an acount ? <Link href="/chat">Signin</Link>
        </p>
      </form>
    </div>
  );
}
