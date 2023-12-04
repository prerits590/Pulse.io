"use client";
import { useContext, useEffect } from "react";
import Hero from "./components/Hero";
import { AuthContext, AuthContextProvider } from "../Context/store";

export default function Home() {
 
  return (
    <main className="">
      <Hero />
    </main>
  );
}
