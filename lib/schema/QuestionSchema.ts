import { z } from "zod";
import { solutionSchema } from "./SolutionSchema";

  
const difficultyEnum = z.enum(["EASY", "MEDIUM", "HARD"]);
const moduleEnum = z.enum(["MECHANICS", "ELECTROMAGNETISM", "LIGHT", "ASTROQUANTUM"]);
const unitEnum = z.enum(["BOOLEAN", "DISPLACEMENT", "VELOCITY", "ACCELERATION", "TIME", "DIRECTION", "TEXT", "MASS", "ELECTRONVOLT", "VOLTAGE", "AMPERE", "JOULES", "WAVELENGTH"])
const tagSchema = z.object({id: z.number(), title: z.string(), name: z.string()});
export const responseFreeSchema = z.object({
  type: z.literal("RESPONSE_FREE"),
  value: z.object({
    question: z.string(),
    unit: unitEnum,
    lines: z.number(),
    answer: z.string()
  })
});
export const responseMultipleSchema = z.object({
  type: z.literal("RESPONSE_MULTIPLE"),
  value: z.object({
    question: z.string(),
    choice: z.string().array(),
    answer: z.string()
  })
})

const questionSchema = z.object({
  id: z.number(),
  title: z.string().trim(),
  name: z.string().trim(),
  difficulty: difficultyEnum,
  content: z.string(),
  module: moduleEnum,
});

export const questionDetailsSchema = z.union([
  z.object({
    type: z.literal("SECTION"),
    value: z.string(),  
  }),
  z.object({
    type: z.literal("IMAGE"),
    value: z.object({
      src: z.string(),
      alt: z.string(),
      height: z.number().optional(),
      width: z.number().optional()
    })
  }),
  z.object({
    type: z.literal("LIST"),
    value: z.array(z.string()),
  }),
  responseFreeSchema,
  responseMultipleSchema
]);


const contentSchema = z.object({
  content: questionDetailsSchema.array(),
  solution: solutionSchema.array()
})

export type DifficultyType = z.infer<typeof difficultyEnum>;
export type ModuleType = z.infer<typeof moduleEnum>;
export type QuestionType = z.infer<typeof questionSchema>
export type ContentType = z.infer<typeof contentSchema>
export type UnitType = z.infer<typeof unitEnum>
export type FreeAnswerType = z.infer<typeof responseFreeSchema>
export type MultiAnswerType = z.infer<typeof responseMultipleSchema>
export type TagType = z.infer<typeof tagSchema>
export type QuestionDetailType = z.infer<typeof questionDetailsSchema>

export function getQuestionSchema() {
  return questionSchema;
}

export function getQuestionDetailSchema() {
  return getQuestionSchema().extend({
    tags: tagSchema.array(),
    prevId: z.number(),
    nextId: z.number()
  })
}

export function getContentSchema() {
  return contentSchema;
}

export function getTagSchema() {
  return tagSchema;
}
