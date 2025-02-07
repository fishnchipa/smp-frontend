import Composition from "@/components/Composition";
import NotFound from "@/components/NotFound";
import Wrapper from "./Wrapper";
import { getContent, getQuestion } from "@/lib/data/question";

type tParams = Promise<{ questionId: string }>;


export default async function Home({params}: {params: tParams}) {
  const { questionId } = await params;
  const data = await getQuestion(questionId);
  const content = await getContent(data.content);
  if (!data || !content) {
    return (
      <NotFound />       
    )
  }

  return (
    <Composition>
      <Wrapper data={data} questionId={questionId} content={content}/>
    </Composition>
  )
}
