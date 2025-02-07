import { signUp } from "./action";

export default function Home() {


  return (
    <div className="flex items-center justify-center min-h-[100dvh]">
      <form className="flex flex-col gap-y-2" action={signUp}>
        <label className="flex flex-col">
          Name: 
          <input name="name" className="border border-black p-2 rounded-md"/>
        </label>
        <label className="flex flex-col">
          Username: 
          <input name="username" className="border border-black p-2 rounded-md"/>
        </label>
        <label className="flex flex-col">
          password 
          <input name="password" className="border border-black p-2 rounded-md"/>
        </label>
        <button type="submit" className="border border-black p-2">Submit</button>
      </form>
    </div>
  )
}
