import { RefObject, useEffect, useRef, useState } from "react";
import PdfContent from "./PdfContent";
import { getContentSchema, QuestionDetailType, QuestionType } from "@/lib/schema/QuestionSchema";

type PdfQuestionProps = {
  question: QuestionType,
  ref: RefObject<number>,
  number: number,
}

// Size of header - 177.5px
// Size of pdf page - 1154px


async function getContent(link: string) {
  const response = await fetch(link);
  if (response.ok) {
    const invalidatedData = await response.json(); 
    const validatedData = getContentSchema().safeParse(invalidatedData); 
    if (validatedData.success) {
      return validatedData.data;
    }
  }
}

export default function PdfQuestion({question, ref, number}: PdfQuestionProps) {
  const divRef = useRef<HTMLDivElement | null>(null)
  const [startContent, setStartContent] = useState<QuestionDetailType | null>(null);
  const [sectionContent, setContentSection] = useState<QuestionDetailType[]>([]);

  useEffect(() => {
    const getData = async () => {
      const data = await getContent(question.content);
      if (data) {
        const [start, ...sections] = data.content;
        setStartContent(start);
        setContentSection(sections)
      }
    }
    getData();



  }, [question])

  const height = () => {
    const value = ref.current; 
    console.log(value, divRef.current?.clientHeight);
  }

  return (
    <div className="flex flex-col mx-[65px] py-[30px] font-cambria" ref={divRef} onClick={height} >
      {startContent && (<PdfContent question={startContent} starting={number} />) }
      {sectionContent.map((item, index) => (<PdfContent key={index} question={item}/>))}
    </div>
  )
}

