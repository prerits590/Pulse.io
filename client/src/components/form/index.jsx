import Link from "next/link";
import React from "react";

export default function Form() {
  return (
    <div className="p-2 ">
      <form className="form p-6">
        <p className="title">Register </p>
        <p className="message">Signup now and get full access to our app. </p>
        <div className="flex">
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

        <label>
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
          <Link href="/Chat">Submit</Link>
        </button>
        <p className="signin">
          Already have an acount ? <Link href="/Chat">Signin</Link>{" "}
        </p>
      </form>
    </div>
  );
}
