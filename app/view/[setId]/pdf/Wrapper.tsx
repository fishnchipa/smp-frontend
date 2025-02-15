"use client"

import PdfHeader from "@/components/pdf/PdfHeader";
import PdfParser from "@/components/pdf/PdfParser";
import { SetType } from "@/lib/schema/SetSchema";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";

type WrapperProps = {
  sessionCookie: RequestCookie | undefined,
  data: SetType
}

export default function Wrapper({sessionCookie, data}: WrapperProps) {
  
  return (
    <>
      <div className="w-[794px] flex flex-col font-cambria pb-[60px]" >
        <PdfHeader module={`Module: ${data.name}`} topic={`Created By: ${data.user}`}/>
        <PdfParser session={sessionCookie} questions={data.questions}/>
      </div>
    </>
  )
}
