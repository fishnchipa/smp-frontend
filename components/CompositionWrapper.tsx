"use client"


import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { UserType } from "@/lib/schema/UserSchema";

export default function CompositionWrapper({children, data}: {children: React.ReactNode, data: UserType}) {
  const [active, setActive] = useState(true);

  return (
    <div className="flex min-w-[100vw] min-h-[100vh]">
    {active && <Sidebar data={data}/>}
      <div className="w-full h-screen flex flex-col">
        <Header setActive={setActive}/>
        {children}
      </div>
    </div>
  )
}
