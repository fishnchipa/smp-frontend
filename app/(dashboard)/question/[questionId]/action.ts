"use server"

import { submitSubmission } from "@/lib/data/submission";
import { z } from "zod";

export async function postSubmission(formData: FormData) {
  const data = Object.fromEntries(formData); 
  const safeData = z.object({questionId: z.string()}).safeParse(data); 
  if (safeData.success) {
    submitSubmission(safeData.data.questionId);
  }
}
