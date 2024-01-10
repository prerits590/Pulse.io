"use client";
import Link from "next/link";
import React, { useContext, useState } from "react";
import { useRouter } from "next/navigation.js";
import {
  createUserWithEmailAndPassword,
  getAuth,
  updateProfile,
} from "firebase/auth";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { db, storage } from "../../../libs/firebase";
import { GlobalContext } from "../../../Context/store";

const initialState = {
  fullName: "",
  email: "",
  password: "",
  image: null,
};

export default function SignupForm() {
  const [credentials, setCredentials] = useState(initialState);
  const auth = getAuth();
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(false);
  const [message, setMessage] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const router = useRouter();
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: name === "image" ? files[0] : value,
    }));
  };
  const [userInfo, setUserInfo] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { email, password } = credentials;

      const res = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      ).then((userCreds) => {
        setUserInfo(userCreds);
      });

      const user = auth.currentUser;
      console.log(user, "-------------->>>>>>>>>>");
      const date = new Date().getTime();
      const storageRef = ref(storage, `${credentials.fullName + date}`);
      const file = credentials.image;

      await uploadBytesResumable(storageRef, file).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {
            // Update profile
            await updateProfile(user, {
              displayName: credentials.fullName,
              photoURL: downloadURL,
            });

            await setDoc(doc(db, "users", user.uid), {
              uid: user.uid,
              displayName: credentials.fullName,
              email: credentials.email,
              photoURL: downloadURL,
            });

            // //create empty user chats on firestore
            await setDoc(doc(db, "userChats", user.uid), {});
            setMessage("Login Successful!");
            setLoggedIn(true);
            router.push("/dashboard");
          } catch (err) {
            console.log(err);
            setErr(true);
            setLoading(false);
          }
        });
      });
    } catch (error) {
      console.error("Registration error:", error.message);
      const errorMessage = error.message;
      setMessage(errorMessage);
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
      <form onSubmit={handleSubmit} className="form p-6">
        <section className="bg-stars">
          <span className="star"></span>
          <span className="star"></span>
          <span className="star"></span>
          <span className="star"></span>
        </section>
        <p className="title">Register</p>

        <div className="w-full">
          <label className="w-full">
            <input
              className="input w-full mb-2 "
              type="text"
              name="fullName"
              placeholder="Full Name"
              onChange={handleChange}
            />
          </label>

          <label className="w-full">
            <input
              className="input w-full mb-2 "
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
            />
          </label>

          <label className="w-full">
            <input
              className="input w-full mb-2 "
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
            />
          </label>

          <label className="w-full">
            <input
              className="input w-full mb-2"
              type="file"
              name="image"
              onChange={handleChange}
            />
          </label>
        </div>
        <button type="submit" className="submit btn btn-primary w-full">
          Submit
        </button>
      </form>
      {/* {loading && <p>Loading...</p>}
      {err && <p>{err}</p>} */}
      <div className="alert-div px-2">{alert(message)}</div>
    </div>
  );
}
