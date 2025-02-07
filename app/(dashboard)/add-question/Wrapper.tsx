"use client"

import Difficulty from "@/components/Difficulty";
import { ChevronRight, Cloud, Lightbulb, Tag, X } from "lucide-react";
import Link from "next/link";
import { useRef, useState } from "react";
import Editor from "./Editor";
import { useEdit } from "@/hooks/useEdit";
import ContentParser from "./ContentParser";
import { createQuestion, getUrls  } from "./action";
import { moduleParse } from "@/lib/utils";
import { DifficultyType, ModuleType } from "@/lib/schema/QuestionSchema";
import Title from "./Title";
import Topic from "./Topic";
import SolutionEditor from "./SolutionEditor";


export default function Wrapper() {
  const {
    solution,
    submitting,
    tags, 
    content, 
    difficulty, 
    module,
    title,
    setModule,
    setDifficulty,
    removeTag,
    addTag,
    setSubmitting
  } = useEdit();
  const tagRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null); 
  const executeScroll = () => {
    if (tagRef.current) {
      tagRef.current.scrollIntoView({
        behavior: "smooth"
      })
    }
  };

  const uploadQuestion = async () => {

    let hasResponse = false;
    setSubmitting(true);
    const contentTypes = ["application/json"];

  
    if (solution.length === 0) {
      setError("Solution cannot be nul");
      setSubmitting(false);
      return;
    }


    // Currently no support for image solutions
    // const imageSolution = solutionMock.type === "IMAGE";
    // if (imageSolution) {
    //   contentTypes.push(solutionMock.value.file.type);
    // }

    for (const item of content) {
      if (item.type.startsWith("RESPONSE")) hasResponse = true;
      if (item.type === "IMAGE") {
        contentTypes.push(item.value.file.type);
      };
    }

    if (tags.size === 0) {
      setError("Question must have at least 1 tag");
      setSubmitting(false);
      return
    }

    if (!hasResponse) {
      setError("Question must have a response");
      setSubmitting(false);
      return;
    }

    // Get presigned url for images with an extra one for the description
    const urls = await getUrls(contentTypes);


    const result = await Promise.all(content.map(async (item) => {
      if (item.type !== "IMAGE") return item; // Keep non-IMAGE items

      const presignedUrl = urls.pop();
      if (presignedUrl) {

        const response = await fetch(presignedUrl.upload, {
          headers: {
            "Content-Type": item.value.file.type,
          },
          method: "PUT",
          body: item.value.file 
        });

        if (response.ok) {
          return {
            type: item.type,
            value: {
              src: presignedUrl.url,
              alt: item.value.alt,
              width: item.value.width,
              height: item.value.height
            }
          };
        }
      }

      return null; 
    }));

    // Filter out null items in the result array in one go
    const filteredResult = result.filter(item => item !== null);

    // TODO: Add support for image solution
    // if (imageSolution) {
    //   const presignedUrl = urls.pop();
    //   if (presignedUrl) {
    //     const response = await fetch(presignedUrl.upload, {
    //       headers: {
    //         "Content-Type": solutionMock.value.file.type,
    //       },
    //       method: "PUT",
    //       body: solutionMock.value.file 
    //     });
    //
    //     if (response.ok) {
    //       solutionDesc = {
    //         type: "IMAGE",
    //         value: {
    //           src: presignedUrl.url,
    //           alt: "image solution",
    //           width: solutionMock.value.width,
    //           height: solutionMock.value.height
    //         }
    //       }
    //     }
    //   }
    // } else {
    //   solutionDesc = {
    //     type: "TEXT",
    //     value: solutionMock.value
    //   }
    // }

    const questionProp = {
      content: filteredResult,
      solution: solution

    }

    const jsonBlob = new Blob(
      [JSON.stringify(questionProp)], 
      { type: 'application/json' });

    const descLink = urls.pop();
    if (descLink) {
      await fetch(descLink.upload, {
        method: "PUT",
        body: jsonBlob 
      });
      createQuestion(
        title,
        descLink.url,
        module,
        difficulty,
        tags
      )
    }

    setSubmitting(false);
  }

  return (
    <div className="h-full flex flex-col w-full bg-lonely overflow-y-scroll pb-40">
      <div className="flex gap-x-3 text-sm items-center p-4">
        <Link
          href={"/problem-list"}
          className="font-bold text-aqua hover:text-soft-aqua"
        >
          Problem List
        </Link>
        <ChevronRight size={15}/>
        <span>Add Question</span>
      </div>
      <div className="flex justify-center w-full">
        <div className="flex flex-col max-w-page bg-white w-full pt-10 pb-40 px-16 rounded-xl">
          <div className="flex items-center justify-between">
            <Title />
            <button 
              className="w-32 group px-3 h-9 border border-aqua hover:border-soft-aqua bg-light-aqua rounded-md text-sm"
              onClick={uploadQuestion}
              disabled={submitting}
            >
              <div className="w-full h-full flex items-center gap-x-2 text-aqua group-hover:text-soft-aqua justify-center whitespace-nowrap">
                Create Question
              </div>
              {error && <span>{error}</span>}
            </button>
          </div>
          <div className="flex gap-x-4 mt-2 text-sm">
            <div className="flex h-7 rounded-3xl bg-light-smokey px-3 text-center items-center">
              <Difficulty status={difficulty}/>
            </div> 
            <button 
              className="flex gap-x-2 h-7 rounded-3xl bg-light-smokey px-3 text-center items-center"
              onClick={executeScroll}
            >
              <Tag className="text-aqua" size={15}/> 
              Topics
            </button> 
            <div className="flex h-7 rounded-3xl bg-light-smokey px-3 text-center items-center gap-x-2 whitespace-nowrap">
              <Cloud className="text-aqua "size={15}/>
              {moduleParse(module)}
            </div> 
          </div>
          <div className="mt-10">
            <div className="flex flex-col gap-y-2">
              <ContentParser />
              <div className="flex flex-col gap-y-2 text-gray-500 mb-10">
                <Editor />
              </div>
              <div className="w-full flex text text-gray-500 gap-x-5">
                <div className="flex flex-col w-full">
                  <span className="w-full">Difficulty</span>
                  <select 
                    className="h-9 text-sm text-black"
                    onChange={(e) => setDifficulty(e.currentTarget.value as DifficultyType)}
                  >
                    <option value="EASY">Easy</option>
                    <option value="MEDIUM">Medium</option>
                    <option value="HARD">Hard</option>
                  </select>
                </div>
                <div className="flex flex-col w-full">
                  <span className="w-full">Module</span>
                  <select 
                    className="h-9 text-sm text-black"
                    onChange={(e) => setModule(e.currentTarget.value as ModuleType)}
                  >
                    <option value="MECHANICS">Advanced Mechanics</option>
                    <option value="ELECTROMAGNETISM">Electromagnetism</option>
                    <option value="LIGHT">The Nature of Light</option>
                    <option value="ASTROQUANTUM">From the Atom To The Universe</option>
                  </select>
                </div>
              </div>
              <hr className="mt-10"/>
              <div className="flex gap-x-2 items-center">
                <Tag className="text-aqua" size={15} />
                Topics
              </div>
              <div 
                className="flex text-sm gap-x-3 text-gray-500"
                ref={tagRef}
              >
                {Array.from(tags).map(([key, item]) => (
                   <span
                      key={key}
                      className="flex gap-x-2 h-7 rounded-3xl bg-light-smokey px-3 text-center items-center hover:text-black"
                   >
                    {item.title} 
                    <button
                      onClick={() => removeTag(item.id)}
                    >
                      <X size={12}/>
                    </button>
                  </span>
                ))}     
              </div>
              <Topic handleTagChange={addTag}/>
              <hr className="mt-10"/>
              <div className="flex gap-x-2 items-center">
                <Lightbulb className="text-aqua" size={15} />
                Solution
              </div>
              <div>
                <SolutionEditor /> 
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
