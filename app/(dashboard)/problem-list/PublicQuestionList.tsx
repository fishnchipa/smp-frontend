import QuestionList from "@/components/QuestionList"
import { getQuestionList } from "@/lib/data/question";

type PublicQuestionListProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function PublicQuestionList({searchParams}: PublicQuestionListProps) {
  const params = await searchParams;
  const data = await getQuestionList(
    params.page, 
    params.modules, 
    params.tags, 
    params.difficulty, 
    params.query
  );

  return (
    <QuestionList data={data}/>
  )
}
