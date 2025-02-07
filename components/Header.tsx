import { Bell, Menu } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

type HeaderProps = {
  setActive: Dispatch<SetStateAction<boolean>>
}

export default function Header({setActive}: HeaderProps) {


  return (
    <header className="flex items-center justify-between bg-white h-16 px-5 border-b py-4">
      <div className="h-full flex items-center gap-x-5">
        <button onClick={() => setActive(prev => !prev)}>
          <Menu size={32} strokeWidth={1}/> 
        </button>
        <input 
          placeholder="Search..." 
          className="w-96 h-9 border border-murky rounded-md px-3 text-sm"
        /> 
      </div>
      <div>
        <Bell size={24} className="text-murky"/>
      </div>
    </header>
  )
}
