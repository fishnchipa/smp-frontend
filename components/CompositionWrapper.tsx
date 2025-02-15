"use client"


import React, { ReactNode, useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { UserType } from "@/lib/schema/UserSchema";
import { SetRecordType } from "@/lib/schema/SetSchema";

type CompositionWrapperProps = {
  data: UserType,
  sets: SetRecordType[],
  children: ReactNode,
}

export default function CompositionWrapper({children, data, sets}: CompositionWrapperProps) {
  const [active, setActive] = useState(true);

  return (
    <div className="flex min-w-[100vw] min-h-[100vh]">
    {active && <Sidebar data={data} sets={sets}/>}
      <div className="w-full h-screen flex flex-col">
        <Header setActive={setActive}/>
        {children}
      </div>
    </div>
  )
}
