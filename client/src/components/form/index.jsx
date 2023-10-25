import Link from "next/link";
import React from "react";

export default function Form() {
  return (
    <div>
      <form className="form bg-base-100">
        <p className="title">Register </p>
        <p className="message">Signup now and get full access to our app. </p>
        <div className="flex">
          <label>
            <input className="input" type="text" placeholder="" required="" />
            <span>Firstname</span>
          </label>

          <label>
            <input className="input" type="text" placeholder="" required="" />
            <span>Lastname</span>
          </label>
        </div>

        <label>
          <input className="input" type="email" placeholder="" required="" />
          <span>Email</span>
        </label>

        <label>
          <input className="input" type="password" placeholder="" required="" />
          <span>Password</span>
        </label>
        <label>
          <input className="input" type="password" placeholder="" required="" />
          <span>Confirm password</span>
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
