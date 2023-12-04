"use client";
import { useContext, useEffect } from "react";
import { AuthContext, AuthContextProvider } from "../context/AuthContext";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  const currentUser = useContext(AuthContext);
  console.log(currentUser);
  return (
    <html lang="en" data-theme="synthwave">
      <body className={inter.className}>
        <AuthContextProvider>{children}</AuthContextProvider>
      </body>
    </html>
  );
}
