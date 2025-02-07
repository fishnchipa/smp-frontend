import { validatedWithUserGet } from "../auth/middleware";
import { getContentSchema, getQuestionDetailSchema, getQuestionSchema } from "../schema/QuestionSchema";
import { paramsParse } from "../utils";

export async function getQuestion(questionId: string) {
  return await validatedWithUserGet(getQuestionDetailSchema(), `question?question=${questionId}`)
}

export async function getQuestionList(
  page?: string | string[], 
  modules?: string | string[], 
  tags?: string | string[], 
  difficulty?: string | string[],
  query?: string | string[],
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
    return await validatedWithUserGet(
      getQuestionSchema().array(),
      `question/list${queryString ? `?${queryString.toString()}` : ""}`
    );
  } else {
    return await validatedWithUserGet(
      getQuestionSchema().array(),
      `question/list/user${queryString ? `?${queryString.toString()}` : ""}`
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

