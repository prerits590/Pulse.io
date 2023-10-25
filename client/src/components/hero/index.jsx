import React from "react";
import Form from "../form";

export default function Hero() {
  return (
    <div className="grid md:grid-cols-8 gap-4 justify-center items-center  p-8">
      <div className=" flex justify-center col-span-5 p-8">
      
      </div>
      <div className="bg-accent flex justify-center col-span-3 p-8">
        <Form />
      </div>
    </div>
  );
}
