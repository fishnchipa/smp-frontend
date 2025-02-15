import NotFound from "@/components/NotFound";
import { getContent, getSetQuestion } from "@/lib/data/question";
import { Suspense } from "react";
import QuestionSkeleton from "@/components/QuestionSkeleton";
import QuestionComponent from "@/components/QuestionComponent";
import { getSearchParams } from "@/lib/utils";

type tParams = Promise<{ questionId: string, setId: string }>;

async function Placeholder({
  params,
  searchParams
}: {
  params: tParams
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const { questionId, setId } = await params;
  const searchQuery = getSearchParams(
    searchParams.modules, 
    searchParams.tags, 
    searchParams.difficulty, 
    searchParams.query
  );
  const data = await getSetQuestion(questionId, setId, searchQuery);
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
      prev={`/set/${setId}/question/${data.prevId === -1 ? questionId : data.prevId.toString()}`}
      next={`/set/${setId}/question/${data.nextId === -1 ? questionId : data.nextId.toString()}`}
      set={setId}
    />
  )
}

export default async function Home({
  params,
  searchParams
}: {
  params: tParams
  searchParams: { [key: string]: string | string[] | undefined };
}) {

  return (
    <Suspense fallback={(<QuestionSkeleton />)}>
      <Placeholder params={params} searchParams={searchParams}/>
    </Suspense> 

  )
}
