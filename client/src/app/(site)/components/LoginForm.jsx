// Update your loginForm component
"use client"
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation.js";
import { useGlobalContext } from "../../../Context/store";
import { signInWithEmailAndPassword } from "firebase/auth";

const initialState = {
  email: "",
  password: "",
};

export default function LoginForm() {
  const [credentials, setCredentials] = useState(initialState);
  const { setCurrentUser } = useGlobalContext();
  const [message, setMessage] = useState("Error while logging in.");
  const [loggedIn, setLoggedIn] = useState(false);
  const router = useRouter();

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
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      if (response.ok) {
        const userData = await response.json();
        setLoggedIn(true);
        setMessage("Login Successful!");
        setCurrentUser(userData.user); // Update your global context with the user data
        router.push("/chat");
      } else {
        const errorData = await response.json();
        console.error("Login error:", errorData.error);
        setMessage("Error while logging in.");
      }
    } catch (error) {
      console.error("Login error:", error.message);
      setMessage("Error while logging in.");
    } finally {
      setCredentials(initialState);
    }
  };

  const alert = (message, loggedIn) => {
    return (
      <div
        role="alert"
        className={`alert ${loggedIn ? "alert-success" : "alert-error"}`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="stroke-current shrink-0 h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span>{message}</span>
      </div>
    );
  };

  return (
    <div className="p-2">
      <form className="form p-6">
        <section className="bg-stars">
          <span className="star"></span>
          <span className="star"></span>
          <span className="star"></span>
          <span className="star"></span>
        </section>
        <p className="title">Login</p>

        <div className="w-full">
          <label className="w-full">
            <input
              className="input w-full mb-2"
              type="email"
              name="email"
              placeholder="Email"
              value={credentials.email}
              onChange={handleChange}
            />
          </label>

          <label className="w-full">
            <input
              className="input w-full mb-2"
              type="password"
              name="password"
              placeholder="Password"
              value={credentials.password}
              onChange={handleChange}
            />
          </label>
        </div>
        <button
          type="submit"
          onClick={handleSubmit}
          className="submit btn btn-primary w-full"
        >
          Submit
          {/* <Link href="/chat">Submit</Link> */}
        </button>
      </form>
      {alert(message)}
    </div>
  );
}
