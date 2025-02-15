"use client"

import { useRef } from "react"
import PdfQuestion from "./PdfQuestion";
import { QuestionType } from "@/lib/schema/QuestionSchema";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import NotFound from "../NotFound";

type PdfParserProps = {
  questions: QuestionType[],
  session: RequestCookie | undefined
}

export default function PdfParser({questions, session}: PdfParserProps) {
  const ref = useRef(177);
  
  if (!session) {
    return (
      <NotFound />
    )
  }

  return (
    <div className="w-full pt-[30px] text-[16px]">
      {questions.map((item, index) => (
        <PdfQuestion key={index} ref={ref} number={index + 1} question={item}/>
      ))}

    </div>
  )
}


