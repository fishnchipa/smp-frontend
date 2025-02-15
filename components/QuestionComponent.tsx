"use client"

import { SolutionParser } from "@/app/(dashboard)/add-question/SolutionEditor";
import Content from "@/components/Content";
import Difficulty from "@/components/Difficulty";
import Dropdown from "@/components/Dropdown";
import { ContentType, QuestionType, TagType } from "@/lib/schema/QuestionSchema";
import FormProvider from "@/providers/FormProvider";
import { ChevronRight, Lightbulb, Shuffle, Star, Tag } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useRef } from "react";

type WrapperProps = {
  data: QuestionType & {tags: TagType[]},
  questionId: string,
  content: ContentType,
  prev: string,
  next: string ,
  set?: string 
}

export default function QuestionComponent({
  data, 
  questionId, 
  content, 
  prev,
  next,
  set
}: WrapperProps) {
  const searchParams = useSearchParams();
  const tagRef = useRef<HTMLDivElement>(null);
  const executeScroll = () => {
    if (tagRef.current) {
      tagRef.current.scrollIntoView({
        behavior: "smooth"
      })
    }
  };

  return (
    <div className="h-full flex flex-col w-full bg-lonely overflow-y-scroll pb-20">
      <div className="flex gap-x-3 text-sm items-center p-4">
        {set ? (
          <Link
            href={`/set/${set}`}
            className="font-bold text-aqua hover:text-soft-aqua"
          >
            Set List
          </Link>
        ) : (
          <Link
            href={"/problem-list"}
            className="font-bold text-aqua hover:text-soft-aqua"
          >
            Problem List
          </Link>
        )}
        <ChevronRight size={15}/>
        <Link
          href={`/question/${questionId}`}
        >
          {data.title}
        </Link>
      </div>
      <div className="flex justify-center w-full">
        <div className="flex flex-col max-w-page bg-white w-full py-10 px-16 rounded-xl">
          <div className="flex justify-between">
            <span className="font-bold text-3xl whitespace-nowrap">
              <h1 className="inline">{questionId}. </h1> {data.title}
            </span> 
            <div className="flex gap-x-3 items-center text-sm">
              <Link href={`${prev}?${searchParams.toString()}`}>Previous</Link>
              <Link href={`${next}?${searchParams.toString()}`}>Next</Link>
              <Shuffle size={16}/>
            </div>
          </div>
          <div className="flex gap-x-4 mt-2 text-sm">
            <div className="flex h-7 rounded-3xl bg-light-smokey px-3 text-center items-center">
              <Difficulty status={data.difficulty}/>
            </div> 
            <button 
              className="flex gap-x-2 h-7 rounded-3xl bg-light-smokey px-3 text-center items-center"
              onClick={executeScroll}
            >
              <Tag className="text-aqua" size={15}/> 
              Topics
            </button> 
            <button 
              className="flex gap-x-2 h-7 rounded-3xl bg-light-smokey px-3 text-center items-center"
            >
              <Star className="text-aqua" size={15}/>
              Add To Set 
            </button> 
          </div>
          <div className="mt-10">
            <div className="flex flex-col gap-y-2">
              <hr />
              <FormProvider>
                <Content questionId={questionId} data={content}/>
              </FormProvider>
              <hr />
              <Dropdown 
                isOpen
                label={(
                  <div className="flex gap-x-2 items-center" ref={tagRef}>
                    <Tag className="text-aqua" size={15} />
                    Topics
                  </div>
                )}
              >
                <div 
                  className="flex text-sm gap-x-3 text-gray-500 mb-5"
                >
                  {data.tags.map((item, index) => (
                     <span
                        key={index}
                        className="flex gap-x-2 h-7 rounded-3xl bg-light-smokey px-3 text-center items-center hover:text-black"
                     >
                      {item.title} 
                    </span>
                  ))}     
                </div>
              </Dropdown>
              <hr />
              <Dropdown
                label={(
                  <div className="flex gap-x-2 items-center">
                    <Lightbulb className="text-aqua" size={15} />
                    Solution
                  </div>
                )}
              >
                <div 
                  className="flex flex-col mt-5 text-gray-500"
                >
                  {content.solution.map((item, index) => (
                    <SolutionParser key={index} solution={item}/>
                  ))}
                </div>
              </Dropdown>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

