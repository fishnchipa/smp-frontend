import Composition from "@/components/Composition";
import Filter from "@/components/Filter";
import PublicQuestionList from "../problem-list/PublicQuestionList";
import { Suspense } from "react";

export default function Home({searchParams}: {searchParams: Promise<{ [key: string]: string | string[] | undefined }>}) {

  return (
    <Composition>
      <div className="flex flex-col gap-y-5 h-full w-full bg-lonely px-5 items-center overflow-y-scroll">
        <div className="max-w-slide w-full flex flex-col gap-y-5 mt-10">
          <h1 className="text-4xl font-bold">Explore Questions</h1>
          <div className="flex gap-x-5">
            <PublicQuestionList searchParams={searchParams}/>
            <div className="w-full text-sm max-w-80">
              <h2 className="h-9 text-3xl font-bold ">Filters</h2>
              <Suspense fallback={(<div>Filter</div>)}>
                <Filter />
              </Suspense>
            </div>
          </div>
        </div>
      </div>
    </Composition>
  )
}
