import { z } from "zod";

const difficultyEnum = z.enum(["EASY", "MEDIUM", "HARD"]);
const moduleEnum = z.enum(["MECHANICS", "ELECTROMAGNETISM", "LIGHT", "ASTROQUANTUM"]);
const unitEnum = z.enum(["BOOLEAN", "DISPLACEMENT", "VELOCITY", "ACCELERATION", "TIME", "DIRECTION", "TEXT"]);

export const questionRecordSchema = z.object({
  id: z.number(),
  title: z.string().trim(),
  name: z.string().trim(),
  difficulty: difficultyEnum,
  content: z.string(),
  module: moduleEnum,
});

export const tagSchema = z.object({
  id: z.number(), 
  title: z.string(), 
  name: z.string()
});

export const responseFreeSchema = z.object({
  type: z.literal("RESPONSE_FREE"),
  value: z.object({
    question: z.string(),
    unit: unitEnum,
    answer: z.string()
  })
});


export const responseMultiSchema = z.object({
  type: z.literal("RESPONSE_MULTIPLE"),
  value: z.object({
    question: z.string(),
    choice: z.string().array(),
    answer: z.string()
  })
})

export const sectionSchema = z.object({
  type: z.literal("SECTION"),
  value: z.string()
})

export const imageSchema = z.object({
  type: z.literal("IMAGE"),
  value: z.object({
    src: z.string(),
    alt: z.string(),
    height: z.number().optional(),
    width: z.number().optional()
  })
});

export const imageCreationSchema = imageSchema.extend({
  value: imageSchema.shape.value.extend({
    file: z.instanceof(File)
  })
})

export const questionContentSchema = z.union([
  sectionSchema,
  imageSchema,
  responseFreeSchema,
  responseMultiSchema
])

export const questionSolutionSchema = z.union([
  sectionSchema,
  imageSchema
])

export const questionSchema = z.object({
  content: questionContentSchema.array(),
  solution: questionSolutionSchema.array() 
})

export type DifficultyType = z.infer<typeof difficultyEnum>;
export type ModuleType = z.infer<typeof moduleEnum>;
export type UnitType = z.infer<typeof unitEnum>
export type TagType = z.infer<typeof tagSchema>
export type QuestionRecordType = z.infer<typeof questionRecordSchema>
export type QuestionType = z.infer<typeof questionSchema>
export type ContentType = z.infer<typeof questionContentSchema>
export type FreeAnswerType = z.infer<typeof responseFreeSchema>
export type MultiAnswerType = z.infer<typeof responseMultiSchema>
