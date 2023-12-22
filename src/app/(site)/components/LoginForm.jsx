"use client";
import Link from "next/link";
import React, { useState } from "react";

import { ref } from "firebase/storage";
import { uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import { useRouter } from "next/navigation.js";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useGlobalContext } from "../../../Context/store";
import { auth, db } from "../../../libs/firebase";

const initialState = {
  fullName: "",
  email: "",
  password: "",
  image: null,
};

export default function loginForm() {
  const [credentials, setCredentials] = useState(initialState);
  const { currentUser, setCurrentUser } = useGlobalContext();
  const [message, setMessage] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const router = useRouter();

  const addUser = async (credentials) => {
    const docRef = await addDoc(collection(db, "users"), {
      email: credentials.email,
      password: credentials.password,
    });
    console.log("docRef", docRef);
  };

  const handleChange = (e) => {
    let name;
    let value;
    if (e.target.files) {
      name = e.target.name;
      value = e.target.files[0].name;
    } else {
      name = e.target.name;
      value = e.target.value;
    }
    console.log(name, value);
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(
        auth,
        credentials.email,
        credentials.password
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          setLoggedIn(true);
          setMessage("Login Successful!");

          router.push("/dashboard");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode, errorMessage);
          setMessage(errorMessage);
          // ..
        });
    } catch (error) {
      console.error(error);
    } finally {
      setCredentials(initialState);
    }
  };

  const alert = () => {
    if (loggedIn == true || message) {
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
    }
    return null;
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
              className="input w-full mb-2 "
              type="email"
              name="email"
              placeholder="Email"
              value={credentials.email}
              onChange={handleChange}
            />
          </label>

          <label className="w-full">
            <input
              className="input w-full mb-2 "
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
        </button>
      </form>
      <div className="alert-div px-2">{alert(message)}</div>
    </div>
  );
}
