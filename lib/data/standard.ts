import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { z } from "zod";

export async function fetchAction<S extends z.ZodType>(
  schema: S,
  api: string, 
  sessionCookie: RequestCookie | undefined
): Promise<z.infer<S> | undefined> {
  if (sessionCookie) {
    const response = await fetch("http://localhost:8080/api/v1/" + api, {
      headers: {
        "Authorization": "Bearer " + sessionCookie.value 
      }
    });
    if (response.ok) {
        const invalidatedData = await response.json();
        const validatedData = schema.safeParse(invalidatedData); 
        if (validatedData.success) {
          return validatedData.data;
        }
    }
  }

  return undefined;
}

export async function postAction(
  api: string,
  sessionCookie: RequestCookie | undefined,
  body: object 
) {
  if (sessionCookie) {
    const response = await fetch("http://localhost:8080/api/v1/" + api, {
      headers: {
        "Authorization": "Bearer " + sessionCookie.value,
        "Content-Type": "application/json"

      },
      method: "POST",
      body: JSON.stringify(body)
    });
    if (response.ok) {
      return {
        status: "Successfully added to set" 
      }
    }
  }

  return {
    error: "Error occurred"
  }
}
