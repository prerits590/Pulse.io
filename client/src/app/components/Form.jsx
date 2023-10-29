"use client";
import Link from "next/link";
import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../libs/firebase.js";

const initialState = {
  fullName: "",
  email: "",
  password: "",
  image: null,
};

export default function Form() {
  const [credentials, setCredentials] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        credentials.email,
        credentials.password
      );
      const user = userCredential.user;
      console.log(user)
    } catch (error) {
      console.error(error);
    } finally {
      console.log("Credential", credentials);
      setCredentials(initialState);
    }
  };

  return (
    <div className="p-2">
      <form onSubmit={handleSubmit} className="form p-6">
        <section className="bg-stars">
          <span className="star"></span>
          <span className="star"></span>
          <span className="star"></span>
          <span className="star"></span>
        </section>
        <p className="title">Register</p>

        <div className="flex">
          <label>
            <input
              className="input"
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={credentials.fullName}
              onChange={handleChange}
              // required
            />
          </label>

          {/* <label>
            <input
              className="input"
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={credentials.lastName}
              onChange={handleChange}
              required
            />
          </label> */}
        </div>

        <label>
          <input
            className="input"
            type="email"
            name="email"
            placeholder="Email"
            value={credentials.email}
            onChange={handleChange}
            // required
          />
        </label>

        <label>
          <input
            className="input"
            type="password"
            name="password"
            placeholder="Password"
            value={credentials.password}
            onChange={handleChange}
            // required
          />
        </label>
        <label>
          <input
            className="input"
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
          />
        </label>
        <button type="submit" className="submit btn btn-primary">
          Submit
          {/* <Link href="/chat">Submit</Link> */}
        </button>
        <p className="signin">
          Already have an account? <Link href="/chat">Sign in</Link>
        </p>
      </form>
    </div>
  );
}
