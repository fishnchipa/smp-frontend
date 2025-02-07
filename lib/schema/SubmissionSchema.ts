import { z } from "zod";
import { getQuestionSchema } from "./QuestionSchema";

const submissionSchema = z.object({
  id: z.number(),
  question: getQuestionSchema(),
  date: z.string()
})

export function getSubmissionSchema() {
  return submissionSchema;
}

export type SubmissionType = z.infer<typeof submissionSchema>
