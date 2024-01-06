import { useContext } from "react";

import { Inter } from "next/font/google";
import { GlobalContextProvider } from "../../Context/store";
import { ChatContextProvider } from "../../Context/ChatContext";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="dark">
      <body className={inter.className}>
        <GlobalContextProvider>
          <ChatContextProvider>{children}</ChatContextProvider>
        </GlobalContextProvider>
      </body>
    </html>
  );
}
