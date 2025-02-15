import Filter from "@/components/Filter";
import { Suspense } from "react";
import { cookies } from "next/headers";
import PrivateQuestionList from "./PrivateQuestionList";

export default async function Home({searchParams}: {searchParams: Promise<{ [key: string]: string | string[] | undefined }>}) {

  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("session"); 

  return (
    <div className="flex flex-col gap-y-5 h-full w-full bg-lonely px-5 items-center overflow-y-scroll">
      <div className="max-w-slide w-full flex flex-col gap-y-5 mt-10">
        <h1 className="text-4xl font-bold">Explore Questions</h1>
        <div className="flex gap-x-5">
          <PrivateQuestionList searchParams={await searchParams} session={sessionCookie}/>
          <div className="w-full text-sm max-w-80">
            <h2 className="h-9 text-3xl font-bold ">Filters</h2>
            <Suspense fallback={(<div>Filter</div>)}>
              <Filter />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  )
}
