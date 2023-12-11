"use client";
import Link from "next/link";
import React, { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref } from "firebase/storage";
import { uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { auth, db, storage } from "../../libs/firebase.js";
import { collection, addDoc, setDoc, doc } from "firebase/firestore";
import { useRouter } from "next/navigation.js";
import { useGlobalContext } from "../../Context/store.js";

const initialState = {
  fullName: "",
  email: "",
  password: "",
  image: null,
};

export default function SignupForm() {
  const [credentials, setCredentials] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(false);

  const router = useRouter();

  // const addUser = async (credentials) => {
  //   const docRef = await addDoc(collection(db, "users"), {
  //     name: credentials.fullName,
  //     email: credentials.email,
  //     image: credentials.image,
  //     password: credentials.password,
  //   });
  //   console.log("docRef", docRef);
  // };

  // const handleChange = (e) => {
  //   e.preventDefault();
  //   const name = e.target[0].value;
  //   const email = e.target[1].value;
  //   const password = e.target[2].value;
  //   const file = e.target[3].files[0];
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);

      //Create a unique image displayName
      const date = new Date().getTime();
      const storageRef = ref(storage, `${displayName + date}`);

      await uploadBytesResumable(storageRef, file).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {
            //Update profile
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });
            //create user on firestore
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });

            //create empty user chats on firestore
            await setDoc(doc(db, "userChats", res.user.uid), {});
            router.push("/chat");
          } catch (err) {
            console.log(err);
            setErr(true);
            setLoading(false);
          }
        });
      });
    } catch (error) {
      console.error(error);
    }

    // console.log("------>>>>>>", currentUser);
    // router.push("/chat");
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

        {/* <div className="w-full">
          <label className="w-full">
            <input
              className="input w-full"
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={credentials.fullName}
              onChange={handleChange}
              // required
            />
          </label>

          <label className="w-full">
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

          <label className="w-full">
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
          <label className="w-full">
            <input
              className="input"
              type="file"
              name="image"
              onChange={handleChange}
            />
          </label>
        </div> */}

        <div className="w-full">
          <label className="w-full">
            <input
              className="input w-full mb-2 "
              type="text"
              name="fullName"
              placeholder="Full Name"
              // value={credentials.fullName}
              // onChange={handleChange}
            />
          </label>

          <label className="w-full">
            <input
              className="input w-full mb-2 "
              type="email"
              name="email"
              placeholder="Email"
              // value={credentials.email}
              // onChange={handleChange}
            />
          </label>

          <label className="w-full">
            <input
              className="input w-full mb-2 "
              type="password"
              name="password"
              placeholder="Password"
              // value={credentials.password}
              // onChange={handleChange}
            />
          </label>

          <label className="w-full">
            <input
              className="input w-full mb-2"
              type="file"
              name="image"
              // onChange={handleChange}
            />
          </label>
        </div>
        <button type="submit" className="submit btn btn-primary w-full">
          Submit
          {/* <Link href="/chat">Submit</Link> */}
        </button>
      </form>
    </div>
  );
}
