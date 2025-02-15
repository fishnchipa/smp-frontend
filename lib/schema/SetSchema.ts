import { z } from "zod";
import { getQuestionSchema } from "./QuestionSchema";

export const setRecordSchema = z.object({
  id: z.string(),
  user: z.string(),
  name: z.string(),
  count: z.number()
}) 

export const setSchema = setRecordSchema.extend({
  questions: getQuestionSchema().array(),
});

export type SetRecordType = z.infer<typeof setRecordSchema>
export type SetType = z.infer<typeof setSchema>
