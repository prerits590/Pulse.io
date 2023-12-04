"use client";
import { useContext, useEffect } from "react";
import Hero from "./components/Hero";
import { AuthContext, AuthContextProvider } from "../context/AuthContext";

export default function Home() {
 
  return (
    <main className="">
      <Hero />
    </main>
  );
}
