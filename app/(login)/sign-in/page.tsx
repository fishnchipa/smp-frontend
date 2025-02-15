"use client"

import Button from "@/components/Button"
import Image from "next/image"
import Link from "next/link"
import { useActionState } from "react"
import { signIn } from "./action"


export default function Home() {
  const [state, action, pending] = useActionState(signIn, null); 

  return (
    <div className="flex flex-col h-[100vh] bg-[#080c0f]">
      <header className="w-full">
        <div className="pl-16 pt-4">
          <Image 
            src="/light.png"
            alt="title"
            width={130}
            height={40}
          />
        </div>
      </header>
      <div className="flex w-full h-full items-center justify-center text-white">
        <form action={action} className="flex flex-col px-16 py-10 border rounded-sm max-w-[420px] box-content">
          <h1 className="text-4xl font-bold mb-2">Welcome Back</h1>
          <div className="text-sm mb-10">
            Login to enjoy a wide range of physics questions.
          </div>
          <hr className="mb-10"/>
          <div className="flex flex-col gap-y-3">
            <label className="flex flex-col gap-y-1">
              Username
              <input 
                name="username" 
                className="bg-[#080c0f] rounded-md ring-0 focus:ring-0 text-white focus:outline-none h-12"
              />   
            </label>
            <label className="flex flex-col gap-y-1">
              Password
              <input 
                name="password" 
                type="password"
                className="bg-[#080c0f] rounded-md ring-0 focus:ring-0 text-white focus:outline-none h-12"
              />   
            </label>
          </div>
          <span className="text-sm text-murky mt-2">
            Don&apos;t Have an account <Link href="/sign-up" className="text-sm hover:text-[#68f7c4] text-[#25f4aa] w-fit my-3">Sign Up</Link>
          </span>
          <Button 
            label="Submit" 
            type="submit" 
            loading={pending} 
            className="bg-[#25f4aa] text-royal hover:text-light-royal" 
            spanClassName="bg-[#68f7c4]"
          />
          {state && <span className="text-red-500">{state.message}</span>}
        </form>
      </div>
      <footer className="flex justify-center items-center w-full bg-aqua h-8 text-sm">This website requires cookies to function</footer>
    </div>
  )
}
