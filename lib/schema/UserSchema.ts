import { z } from "zod";



const userSchema = z.object({
  name: z.string(),
  username: z.string(),
  role: z.string(),
})

export function getUserSchema() {
  return userSchema;
}

