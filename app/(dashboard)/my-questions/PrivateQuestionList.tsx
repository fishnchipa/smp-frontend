"use client"

import { questionColumns, questionPlaceholder } from "@/components/DataTable/Columns";
import QuestionList from "@/components/QuestionList"
import { QuestionListSkeleton } from "@/components/QuestionListSkeleton";
import { useQuestionList } from "@/hooks/useQuestionList";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";

type PublicQuestionListProps = {
  searchParams: { [key: string]: string | string[] | undefined }
  session: RequestCookie | undefined
}

export default function PrivateQuestionList({searchParams, session}: PublicQuestionListProps) {
  const {loading, data} = useQuestionList(searchParams, 300, session, true);

  if (!session) {
    return (
      <QuestionListSkeleton columns={questionPlaceholder} />
    )
  }

  return (
    <>
    {loading ? (<QuestionListSkeleton columns={questionColumns("/question", session)} />) : <QuestionList data={data} session={session}/>}
    </>
  )
}
