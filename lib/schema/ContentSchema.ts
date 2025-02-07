import { z } from "zod";
import { responseFreeSchema, responseMultipleSchema } from "./QuestionSchema";
import { solutionSchema } from "./SolutionSchema";

export const contentCreationSchema = z.union([
  z.object({
    type: z.literal("SECTION"),
    value: z.string(),  
  }),
  z.object({
    type: z.literal("IMAGE"),
    value: z.object({
      src: z.string(),
      alt: z.string(),
      file: z.instanceof(File),
      height: z.number().optional(),
      width: z.number().optional()
    })
  }),
  z.object({
    type: z.literal("LIST"),
    value: z.array(z.string()),
  }),
  responseFreeSchema,
  responseMultipleSchema,
]);

export const tempContentCreationSchema = z.object({
  content: contentCreationSchema,
  solution: solutionSchema

})

export type ContentCreationType = z.infer<typeof contentCreationSchema>
