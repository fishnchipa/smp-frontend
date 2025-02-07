import React from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { getUser } from "@/lib/data/user";
import CompositionWrapper from "./CompositionWrapper";

export default async function Composition({children}: {children: React.ReactNode}) {
  const data = await getUser();

  return (
    <CompositionWrapper data={data}>{children}</CompositionWrapper>
  )
}
