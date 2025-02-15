"use client"

import { QuestionDetailType, } from "@/lib/schema/QuestionSchema"
import Image from "next/image"

type PdfContentProps = {
  question: QuestionDetailType
  starting?: number
}

export default function PdfContent({question, starting}: PdfContentProps) {


  switch (question.type) {
    case "SECTION":
      return (
        <div>
          {starting && <span>{starting}. </span>}
          <div dangerouslySetInnerHTML={{__html: question.value}} className="inline"></div>
        </div>
    )
    case "IMAGE":
      return (
        <div>
        {(question.value.width && question.value.height) ? (
          <div className="flex items-center justify-center">
            <Image
              src={question.value.src} 
              alt={question.value.alt}
              width={question.value.width}
              height={question.value.height}
            />
          </div>
          ) : (
          <div className="aspect-video relative w-full">
            <Image
              src={question.value.src} 
              alt={question.value.alt}
              fill
            />
          </div>
          )}
        </div>
      )
    case "RESPONSE_MULTIPLE":
      return (
        <div>
          <div>
            {starting && <span>{starting}. </span>}
            <div 
              className="w-full mb-2 inline" 
              dangerouslySetInnerHTML={{__html: question.value.question}}
            />
          </div>
          <div className="flex flex-col ">
            {question.value.choice.map((item, index) => (
              <span key={index}>({String.fromCharCode(97 + index)}) {item}</span>
            ))}
          </div>
        </div>
      )
    case "RESPONSE_FREE":
      return (
        <div>
          <div>
            {starting && <span>{starting}. </span>}
            <div 
              className="w-full mb-2 inline" 
              dangerouslySetInnerHTML={{__html: question.value.question}}
            />
          </div>
          <div className="flex flex-col mt-[25px]">
            {Array.from({ length: question.value.lines }).map((_, index) => (
              <div key={index} className="w-full h-[40px] border-t-[1px] border-black border-dotted" />
            ))}          
          </div>
        </div>
      )
  }
}

