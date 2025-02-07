"use client"

import Input from "@/components/Input";
import Link from "next/link";
import Button from "@/components/Button";
import { useActionState } from "react";
import { signUp } from "./action";

export default function Home() {

  const [state, action, pending] = useActionState(signUp, null); 
  return (
    <div className="flex items-center justify-center min-h-[100dvh]">
      <form className="flex flex-col gap-y-1" action={action}>
        <div className="flex flex-col gap-y-5">
          <Input name="name" label="Name"/>
          <Input name="username" label="Username" />
          <Input name="password" label="Password" type="password"/>
          <Input name="match" label="Confirm Password" type="password"/>
        </div>
        <Link href="/sign-in" className="text-sm hover:text-black text-murky w-fit">Login</Link>
        <Button label="Submit" type="submit" loading={pending}/>
        {state && <span className="text-red-500">{state.message}</span>}
      </form>
    </div>
  )
}
