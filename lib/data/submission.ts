import { validatedWithUserGet, validatedWithUserPost } from "../auth/middleware";
import { DifficultyType, getTagSchema, ModuleType } from "../schema/QuestionSchema";
import { getSubmissionSchema } from "../schema/SubmissionSchema";


export async function getSubmissions() {
  return await validatedWithUserGet(getSubmissionSchema().array(), "user/submissions")
}

export async function submitSubmission(questionId: string) {
  return await validatedWithUserPost({questionId: questionId}, "question/submission");
}


export async function getS3Urls(contentType: string[]) {
  return await validatedWithUserPost(contentType, "question/submission/s3urls")
}

export async function getTags(input: string) {
  return await validatedWithUserGet(getTagSchema().array(), `question/tag?query=${input}`)
}

export async function createValidQuestion(
  title: string,
  content: string, 
  module: ModuleType,
  difficulty: DifficultyType,
  tags: number[]
) {
  let url = "question";

  if (tags.length !== 0) {
    const queryParams = new URLSearchParams();
    tags.forEach(tag => queryParams.append("tags", tag.toString()));
    url += "?" + queryParams.toString();
  }

  return await validatedWithUserPost({
    title,
    content,
    module,
    difficulty
  }, url);
}
