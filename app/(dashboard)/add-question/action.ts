"use server"

import { createValidQuestion, getS3Urls, getTags } from "@/lib/data/submission";
import { DifficultyType, ModuleType, TagType } from "@/lib/schema/QuestionSchema";
import { z } from "zod";

export async function getUrls(contentType: string[]) {
  const urls = await getS3Urls(contentType); 
  const safeUrls = z.object({url: z.string(), upload: z.string()}).array().safeParse(urls);
  if (safeUrls.success) {
    return safeUrls.data.map(item => ({...item, url: process.env.AWS_URL + item.url}))
  }
  return [];

}

export async function searchTags(input: string) {
  return await getTags(input);
}

export async function createQuestion(
  title: string,
  content: string, 
  module: ModuleType,
  difficulty: DifficultyType,
  tags: Map<number, TagType>
) {
  const tagList = Array.from(tags, ([id]) => id);


  await createValidQuestion(title, content, module, difficulty, tagList); 
}
