"use client";
import Link from "next/link";
import React, { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref } from "firebase/storage";
import { uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { auth, db, storage } from "../../libs/firebase.js";
import { collection, addDoc } from "firebase/firestore";
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
  const { currentUser, setCurrentUser } = useGlobalContext();
  const router = useRouter();

  const addUser = async (credentials) => {
    const docRef = await addDoc(collection(db, "users"), {
      name: credentials.fullName,
      email: credentials.email,
      image: credentials.image,
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
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        credentials.email,
        credentials.password
      );

      const date = new Date().getTime();
      const storageRef = ref(storage, `${credentials.fullName + date}`);

      await uploadBytesResumable(storageRef, credentials.image).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {
            await updateProfile(userCredential.user, {
              fullName: credentials.fullName,
              photoURL: downloadURL,
            });
            console.log("File available at", downloadURL);
          } catch (error) {
            console.log(error);
          }
        });
      });

      const user = userCredential.user;

      setCurrentUser(user);

      console.log("from credssss", user);
    } catch (error) {
      console.error(error);
    } finally {
      // console.log("Credential", credentials);
      addUser(credentials);
      setCredentials(initialState);
      console.log("------>>>>>>", currentUser);
    }

    if(currentUser.Islogin ===true){
      router.push("/chat")
    }
    // console.log("------>>>>>>", currentUser);
    // router.push("/chat");
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
        <p className="title">Register</p>

        <div className="flex w-full">
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
        <button
          type="submit"
          onClick={handleSubmit}
          className="submit btn btn-primary"
        >
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
