"use client";
import Link from "next/link";
import React, { useState } from "react";

import { ref } from "firebase/storage";
import { uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { auth, db, storage } from "../../libs/firebase.js";
import { collection, addDoc } from "firebase/firestore";
import { useRouter } from "next/navigation.js";
import { useGlobalContext } from "../../Context/store.js";
import { signInWithEmailAndPassword } from "firebase/auth";

const initialState = {
  fullName: "",
  email: "",
  password: "",
  image: null,
};

export default function loginForm() {
  const [credentials, setCredentials] = useState(initialState);
  const { currentUser, setCurrentUser } = useGlobalContext();
  const [message, setMessage] = useState("Error while logging in.");
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
      // const userCredential = await signInWithEmailAndPassword(
      //   auth,
      //   credentials.email,
      //   credentials.password
      // );

      // const user = userCredential.user;
      // router.push("/chat");
      // setCurrentUser(user);
      // console.log(user);
      // console.log("from credssss", user);

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
          // console.log(user);
          // console.log("first------->>>>>>>>>", setLoggedIn);
          router.push("/chat");
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode, errorMessage);
          // ..
        });
    } catch (error) {
      console.error(error);
    } finally {
      // console.log("Credential", credentials);
      setCredentials(initialState);
      // console.log("------>>>>>>", currentUser);
    }

    // if (currentUser) {
    // }
    // console.log("------>>>>>>", currentUser);
    // router.push("/chat");
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
          {/* <Link href="/chat">Submit</Link> */}
        </button>
      </form>
      {alert(message)}
    </div>
  );
}
