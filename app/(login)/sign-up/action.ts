"use server"

import { cookies } from "next/headers";
import { redirect } from "next/navigation";


export async function signUp(formData: FormData) {
  const data = Object.fromEntries(formData);

  const response = await fetch(process.env.API_ENDPOINT + "api/v1/auth/register", {
    method: "POST",
    headers: {
    "Content-Type": "application/json",
    },
    body: JSON.stringify(data),

  });
  
  if (response.ok) {
    const { token } = await response.json();
    const cookieStore = await cookies()
    cookieStore.set({
      name: "session",
      value: token,
      httpOnly: true,
      path: "/"
    })
    redirect("/");
  }
}
