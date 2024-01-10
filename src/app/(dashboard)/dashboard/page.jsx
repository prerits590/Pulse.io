"use client";
import React from "react";
import ResponsiveComponent from "./components/ResponsiveComponent";
import withAuth from "./components/WithAuth";

function page() {
  return (
    <div>
      <ResponsiveComponent />
    </div>
  );
}

export default withAuth(page);
