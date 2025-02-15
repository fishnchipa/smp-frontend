import { cookies } from "next/headers";
import { z } from "zod";
import { ContentType, DifficultyType, ModuleType } from "../schema/QuestionSchema";


export async function validatedWithUserGet<S extends z.ZodTypeAny>(
  schema: S,
  api: string, 
): Promise<z.infer<S>> {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("session"); 
  if (sessionCookie) {
    const response = await fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + api, {
      headers: {
        "Authorization": "Bearer " + sessionCookie.value 
      }
    });
    if (response.status === 401) {
      return;
    }

    if (response.ok) {
      const invalidatedData = await response.json(); 
      const validatedData = schema.safeParse(invalidatedData); 
      if (validatedData.success) {
        return validatedData.data;
      }
    }
  }
}


export async function validatedWithUserPost(
  body: {[key: string]: string | number | ContentType | ModuleType | DifficultyType} | string | number | string[],
  api: string, 
) {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("session"); 
  
  if (sessionCookie) {
    const response = await fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + api, {
      method: "POST",
      headers: {
        "Authorization": "Bearer " + sessionCookie.value,
        "Content-Type": "application/json"
      },

      body: JSON.stringify(body)
    });

    if (response.ok) {
      return await response.json();
    }
  }
}

