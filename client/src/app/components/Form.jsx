"use client";
import Link from "next/link";
import React, { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref } from "firebase/storage";
import { uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { auth, storage } from "../../libs/firebase.js";
import { useRouter } from "next/navigation.js";

const initialState = {
  fullName: "",
  email: "",
  password: "",
  image: null,
};

export default function Form() {
  const [credentials, setCredentials] = useState(initialState);
 const router = useRouter()
  const handleChange = (e) => {
    let name; 
    let value; 
    if(e.target.files){
      name = e.target.name 
      value = e.target.files[0].name
    }else{
      name = e.target.name
      value = e.target.value

    }
    console.log(name,value)
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: value,
    }));
  };
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const userCredential = await createUserWithEmailAndPassword(
  //       auth,
  //       credentials.email,
  //       credentials.password
  //     );
  //     const date = new Date().getTime();
  //     const storageRef = ref(storage, `${credentials.fullName + date}`);

  //     await uploadBytesResumable(storageRef, credentials.image).then(() => {
  //       getDownloadURL(storageRef).then(async (downloadURL) => {
  //         try {
  //           await updateProfile(userCredential.user, {
  //             fullName: credentials.fullName,
  //             photoURL: downloadURL,
  //           });
  //           console.log("File available at", downloadURL);
  //         } catch (error) {
  //           c;
  //           console.log(error);
  //         }
  //       });
  //     });

  //     const user = userCredential.user;
  //     console.log(user);
  //   } catch (error) {
  //     console.error(error);
  //   } finally {
  //     console.log("Credential", credentials);
  //     setCredentials(initialState);
  //   }
  // };

  const handleSubmit = (e) => {
    e.preventDefault()
     
    // Your code that uses useRouter
    console.log("------>>>>>>")
    router.push('/chat')
  
    
    
  }

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
