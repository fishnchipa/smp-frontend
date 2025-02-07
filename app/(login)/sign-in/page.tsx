import Link from "next/link";
import { signIn } from "./action";

export default function Home() {
  


  return (
    <div className="flex flex-col items-center justify-center min-h-[100dvh]">
      <form className="flex flex-col gap-y-2" action={signIn}>
        <label className="flex flex-col">
          Username: 
          <input name="username" className="border border-black p-2 rounded-md"/>
        </label>
        <label className="flex flex-col">
          password 
          <input name="password" className="border border-black p-2 rounded-md"/>
        </label>
        <Link href="/sign-up" className="text-sm hover:text-black text-murky w-fit">Sign Up</Link>
        <button type="submit" className="border border-black p-2">Submit</button>
      </form>
    </div>
  )
}
