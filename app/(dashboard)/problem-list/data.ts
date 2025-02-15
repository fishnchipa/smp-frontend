"use client"

import { fetchAction } from "@/lib/data/standard";
import { getQuestionSchema } from "@/lib/schema/QuestionSchema";
import { getSearchParams } from "@/lib/utils";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";


export async function getQuestionList(
  page?: string | string[], 
  modules?: string | string[], 
  tags?: string | string[], 
  difficulty?: string | string[],
  query?: string | string[],
  session?: RequestCookie | undefined,
  active = true,
) {
  const queryString = getSearchParams(modules, tags, difficulty, query);

  if (page) {
    if (!Array.isArray(page)) {
      queryString.set("page", page);
    }
  }

  if (active) {
    return await fetchAction(
      getQuestionSchema().array(),
      `question/list${queryString ? `?${queryString.toString()}` : ""}`,
      session
    );
  } else {
    return await fetchAction(
      getQuestionSchema().array(),
      `question/list/user${queryString ? `?${queryString.toString()}` : ""}`,
      session
    );
  }
}
