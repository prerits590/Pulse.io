"use client";
import React, { useEffect, useState } from "react";
import StandardView from "./StandardView";
import MobileView from "../mobileView/MobileView";

function ResponsiveComponent() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    // Attach the event listener
    window.addEventListener("resize", handleResize);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return <div>{windowWidth > 550 ? <StandardView /> : <MobileView />}</div>;
}

export default ResponsiveComponent;
