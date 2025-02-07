"use client"

import Link from "next/link";
import { signIn } from "./action";
import Button from "@/components/Button";
import Input from "@/components/Input";
import { useActionState } from "react";

export default function Home() {
  const [state, action, pending] = useActionState(signIn, {error: false}); 

  return (
    <div className="flex flex-col items-center justify-center min-h-[100dvh]">
      <form className="flex flex-col gap-y-1" action={action}>
        <div className="flex flex-col gap-y-5">
          <Input name="username" label="Username"/>
          <Input name="password" label="Password" type="password"/>
        </div>
        <Link href="/sign-up" className="text-sm hover:text-black text-murky w-fit">Sign Up</Link>
        <Button label="Submit" type="submit" loading={pending}/>
        {state.error && <span className="text-red-500">Unable To Login</span>}
      </form>
    </div>
  )
}
