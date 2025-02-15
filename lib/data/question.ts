import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";

import { validatedWithUserGet } from "../auth/middleware";
import { getContentSchema, getQuestionDetailSchema, getQuestionSchema } from "../schema/QuestionSchema";
import { paramsParse } from "../utils";
import { fetchAction } from "./standard";

export async function getQuestion(questionId: string, searchParams: URLSearchParams) {
  return await validatedWithUserGet(
    getQuestionDetailSchema(), 
    `question?question=${questionId}&${searchParams.toString()}`
  )
}

export async function getSetQuestion(questionId: string, setId: string, searchParams: URLSearchParams) {
  return await validatedWithUserGet(
    getQuestionDetailSchema(), 
    `collection/question?questionId=${questionId}&set=${setId}&${searchParams.toString()}`
  )
}

export async function getQuestionList(
  page?: string | string[], 
  modules?: string | string[], 
  tags?: string | string[], 
  difficulty?: string | string[],
  query?: string | string[],
  session?: RequestCookie | undefined,
  active = true,
) {
  const queryString = new URLSearchParams();
  if (modules) {
    if (Array.isArray(modules)) {
      queryString.set("modules", modules.map(x => paramsParse(x)).join(","));
    } else {
      queryString.set("modules", paramsParse(modules));
    }
  }

  if (tags) {
    if (Array.isArray(tags)) {
      queryString.set("tags", tags.join(","));
    } else {
      queryString.set("tags", tags);
    }
  }

  if (difficulty) {
    if (Array.isArray(difficulty)) {
      queryString.set("difficulty", difficulty.join(",").toUpperCase()) ;
    } else {
      queryString.set("difficulty", difficulty.toUpperCase()) ;
    }
  }
  
  if (query) {
    if (!Array.isArray(query)) {
      queryString.set("query", query);
    }
  }

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


export async function getContent(link: string) {
  const response = await fetch(link);
  if (response.ok) {
    const invalidatedData = await response.json(); 
    const validatedData = getContentSchema().safeParse(invalidatedData); 
    if (validatedData.success) {
      return validatedData.data;
    }
  }
}

