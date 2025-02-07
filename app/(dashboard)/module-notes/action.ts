"use server"

import { getQuestionList } from "@/lib/data/question";

export async function fetchData() {
  const data = await getQuestionList(undefined, undefined, undefined, undefined, undefined, false)
  console.log(data);
}
