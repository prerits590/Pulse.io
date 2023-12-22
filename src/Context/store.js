"use client";
import { onAuthStateChanged } from "firebase/auth";
import {
  createContext,
  useEffect,
  useState,
  useContext,
  Dispatch,
  SetStateAction,
} from "react";
import { auth } from "../libs/firebase";

export const GlobalContext = createContext({
  currentUser: null,
  currentUser: () => {},
});

export const GlobalContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({
    email: "",
    fullName: "",
    image: "",
    password: "",
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });

    // Cleanup the subscription when the component unmounts
    return () => unsubscribe();
  }, []);

  console.log("INSIDE-CONTEXT", currentUser);

  // Return the JSX element
  return (
    <GlobalContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </GlobalContext.Provider>
  );
};
export const useGlobalContext = () => useContext(GlobalContext);
