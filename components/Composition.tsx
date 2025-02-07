import React from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";

export default function Composition({children}: {children: React.ReactNode}) {


  return (
    <div className="flex min-w-[100vw] min-h-[100vh]">
      <Sidebar />
      <div className="w-full h-screen flex flex-col">
        <Header />
        {children}
      </div>
    </div>
  )
}
