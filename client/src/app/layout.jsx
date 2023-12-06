"use client";
import { useContext } from "react";
import { GlobalContext, GlobalContextProvider } from "../Context/store";

import "./globals.css";
import { Inter } from "next/font/google";
import { ChatContextProvider } from "../Context/ChatContext";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="synthwave">
      <body className={inter.className}>
        <GlobalContextProvider>
          <ChatContextProvider>{children}</ChatContextProvider>
        </GlobalContextProvider>
      </body>
    </html>
  );
}
