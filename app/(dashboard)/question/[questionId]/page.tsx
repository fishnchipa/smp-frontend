import NotFound from "@/components/NotFound";
import { getContent, getQuestion } from "@/lib/data/question";
import { Suspense } from "react";
import QuestionSkeleton from "@/components/QuestionSkeleton";
import { getSearchParams } from "@/lib/utils";
import QuestionComponent from "@/components/QuestionComponent";

type tParams = Promise<{ questionId: string }>;

async function Placeholder({
  params,
  searchParams
}: {
  params: tParams,
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const { questionId } = await params;
  const searchQuery = getSearchParams(
    searchParams.modules, 
    searchParams.tags, 
    searchParams.difficulty, 
    searchParams.query
  );
  const data = await getQuestion(questionId, searchQuery);
  const content = await getContent(data.content);
  if (!data || !content) {
    return (
      <NotFound />       
    )
  }

  return (
    <QuestionComponent 
      data={data} 
      questionId={questionId} 
      content={content} 
      prev={`/question/${data.prevId === -1 ? questionId : data.prevId.toString()}`}
      next={`/question/${data.nextId === -1 ? questionId : data.nextId.toString()}`}
    />
  )
}

export default async function Home({
  params,
  searchParams
}: {
  params: tParams
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {

  return (
    <Suspense fallback={(<QuestionSkeleton />)}>
      <Placeholder params={params} searchParams={await searchParams}/>
    </Suspense> 

  )
}
