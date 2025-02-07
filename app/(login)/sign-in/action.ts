"use server"

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

type InitialType = {
  error: boolean 
}

export async function signIn(initial: InitialType, formData: FormData) {
  const data = Object.fromEntries(formData);

  const response = await fetch(process.env.API_ENDPOINT + "api/v1/auth/authenticate", {
    method: "POST",
    headers: {
    "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
 
  console.log(initial.error);

  if (response.ok) {
    const { token } = await response.json();
    const cookieStore = await cookies()
    cookieStore.set({
      name: "session",
      value: token,
      httpOnly: true,
      path: "/",
    })

    redirect("/");
  }
  return {
    error: true
  }
}

