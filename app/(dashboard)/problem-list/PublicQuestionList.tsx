"use client"

import QuestionList from "@/components/QuestionList"
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { useQuestionList } from "@/hooks/useQuestionList";
import { QuestionListSkeleton } from "@/components/QuestionListSkeleton";
import { questionPlaceholder } from "@/components/DataTable/Columns";

type PublicQuestionListProps = {
  searchParams: { [key: string]: string | string[] | undefined },
  session: RequestCookie | undefined
}

export default function PublicQuestionList({searchParams, session}: PublicQuestionListProps) {
  const {loading, data} = useQuestionList(searchParams, 300, session);

  if (!session) {
    return (
      <QuestionListSkeleton columns={questionPlaceholder} />
    )
  }
  return (
    <>
    {loading ? (<QuestionListSkeleton columns={questionPlaceholder} />) : <QuestionList data={data} session={session}/>}
    </>
  )
}
