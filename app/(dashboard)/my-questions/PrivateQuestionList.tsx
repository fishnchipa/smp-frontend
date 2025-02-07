
import QuestionList from "@/components/QuestionList"
import { getQuestionList } from "@/lib/data/question";

type PublicQuestionListProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function PrivateQuestionList({searchParams}: PublicQuestionListProps) {
  const params = await searchParams;
  const data = await getQuestionList(
    params.page, 
    params.modules, 
    params.tags, 
    params.difficulty, 
    params.query,
    false
  );

  return (
    <QuestionList data={data}/>
  )
}
