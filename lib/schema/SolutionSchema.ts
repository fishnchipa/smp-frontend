import { z } from "zod";



export const imageSolutionSchema = z.object({
  type: z.literal("IMAGE"),
  value: z.object({
    alt: z.string(),
    file: z.any(),
    height: z.number().optional(),
    width: z.number().optional()
  })
})

export const textSolutionSchema = z.object({
  type: z.literal("TEXT"),
  value: z.string(),
})


export const mathSolutionSchema = z.object({
  type: z.literal("MATH"),
  value: z.string(),
})

export const solutionSchema = z.union([
  imageSolutionSchema,
  textSolutionSchema,
  mathSolutionSchema
])


export type SolutionType = z.infer<typeof solutionSchema>
