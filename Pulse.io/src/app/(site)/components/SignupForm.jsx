// Update your SignupForm component
"use client"
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation.js";

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

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: name === "image" ? files[0] : value,
    }));
  };

  console.log("credential",credentials)

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("fullName", credentials.fullName);
      formData.append("email", credentials.email);
      formData.append("password", credentials.password);
      formData.append("image", credentials.image);


      const response = await fetch("/api/register", {
        method: "POST",
        body: formData,
      });
      console.log("response",response)

      if (response.ok) {
        const userData = await response.json();
        setLoading(false);
        router.push("/chat");
      } else {
        const errorData = await response.json();
        console.error("Registration error:", errorData.error);
        setErr(true);
        setLoading(false);
      }
    } catch (error) {
      console.error("Registration error:", error.message);
      setErr(true);
      setLoading(false);
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

      {loading && <p>Loading...</p>}
      {err && <p>Error during registration</p>}
    </div>
  );
}
