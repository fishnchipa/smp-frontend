"use server"

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

type InitialType = {
  message: string
} | null

export async function signIn(initial: InitialType, formData: FormData) {
  const data = Object.fromEntries(formData);

  const response = await fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + "auth/authenticate", {
    method: "POST",
    headers: {
    "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
 
  console.log(initial);

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
    message: "username or password is incorrect"
  }
}

