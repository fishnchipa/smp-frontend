"use server"

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

type InitialType =  {
  message: string
} | null

export async function signUp(initial: InitialType, formData: FormData) {
  const data = Object.fromEntries(formData);
  
  if (data.password !== data.confirm) {
    return {
      message: "passwords do not match"
    }
  }

  console.log(initial);
  delete data.match;

  const response = await fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + "auth/register", {
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
      path: "/",
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7) 
    })
    redirect("/");
  }

  return {
    message: "username is already in use"
  }
}
