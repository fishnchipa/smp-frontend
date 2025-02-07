"use client"
import { ContentType, QuestionDetailtype } from "@/lib/schema/QuestionSchema"
import Image from "next/image"
import Answer from "./Answer"
import { useForm } from "@/hooks/useForm"
import { useMemo, useState } from "react"
import Spinner from "./Spinner"
import { postSubmission } from "@/app/(dashboard)/question/[questionId]/action"
import AnswerMulti from "./AnswerMulti"

type ContentProps = {
  questionId: string,
  data: ContentType
}

type ContentMapProps = {
  data: QuestionDetailtype,
  index: number
}
function ContentMap({data, index}: ContentMapProps) {
  switch (data.type) {
    case "SECTION":
      return (
        <div dangerouslySetInnerHTML={{__html: data.value}}></div>
    )
    case "IMAGE":
      return (
        <div key={index}>
          {(data.value.width && data.value.height) ? (
            <div className="flex items-center justify-center">
              <Image
                src={data.value.src} 
                alt={data.value.alt}
                width={data.value.width}
                height={data.value.height}
              />
            </div>
          ) : (
            <div className="aspect-video relative w-full">
              <Image
                src={data.value.src} 
                alt={data.value.alt}
                fill
              />
            </div>
          )}
        </div>
    )
    case "LIST":
      return (
        <ul>
          {data.value.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
    )
    case "RESPONSE_FREE":
      return (
        <div className="flex flex-col gap-y-2">
          <div dangerouslySetInnerHTML={{__html: data.value.question}}></div>
          <Answer data={data} index={index}/>
        </div> 
    )
    case "RESPONSE_MULTIPLE":
      return (
        <AnswerMulti key={index} index={index} data={data}/>
      )

  }

}

export default function Content({questionId, data}: ContentProps) {
  const [loading, setLoading] = useState(false);

  const {
    formData, 
    setErrors,
    setSubmission
  } = useForm();

  const solutions = useMemo(() => {
    const responses = data.content.reduce((acc, item, index) => {
      if (item.type === "RESPONSE_FREE" || item.type === "RESPONSE_MULTIPLE") {
        acc[index.toString()] = item.value.answer;
      }
      return acc;
    }, {} as Record<string, string>);

    return responses;
  }, [data])

  const checkAnswer = async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let correct = true;
    const res = Object.entries(solutions).reduce((acc, [key, value]) => {
      if (formData[key] === value) {
        acc[key] = false;
      } else {
        acc[key] = true 
        correct = false;
      }
      return acc;
    }, {} as Record<string, boolean>) 

    setErrors(res);
    if (correct) {
      setLoading(true);
      const questionData = new FormData();
      questionData.append("questionId", questionId);
      await postSubmission(questionData); 
      setLoading(false);
    }
    setSubmission(correct);
  }

  

  return (
    <form className="flex flex-col mt-10" onSubmit={checkAnswer}>
      <div className="w-full flex flex-col gap-y-3">
        {data.content.map((item, index) => (<ContentMap key={index} data={item} index={index}/>))}
      </div>
      <div className="flex justify-end w-full my-10">
        <button 
          className={`h-10 w-24  rounded-md hover:bg-soft-aqua ${loading ? "bg-soft-aqua" : "bg-aqua"}`}

          type="submit"
          disabled={loading}
        >
        {loading ? 
          <div className="w-full h-full flex justify-center items-center">
            <Spinner bg="#D9FFF7" /> 
          </div>
            : 
          <span className="text-white text-sm">Submit</span>}
        </button> 
      </div>
    </form>
  )
}
