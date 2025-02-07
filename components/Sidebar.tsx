import { Atom, CircleHelp, Cog, LogOut, PackagePlus, Plus, ScanSearch, SquarePen } from "lucide-react";
import Image from "next/image";
import Button from "./Button";
import Setbar from "./Setbar";
import { getUser } from "@/lib/data/user";
import Link from "next/link";

export default async function Sidebar() {
  const data = await getUser();
  return (
    <div className="flex flex-col justify-between h-screen min-w-72 max-w-72 bg-royal text-white">
      <div>
        <div className="p-4">
          <h1 className="font-bold text-white text-3xl">SolveMyPhysics</h1>
          <div className="flex items-center gap-x-3 pt-8 pb-4">
            <div className="w-10 aspect-square rounded-full overflow-hidden relative">
              <Image 
                src="/fate1.jpg" 
                alt="profile picture"
                fill
                className="object-cover"
              />
            </div>
            <section>
              <Link 
                className="block font-bold text-xl hover:underline"
                href={`/profile/${data.username}`}
              >
                {data.username}
              </Link>
              <span className="block text-xs text-smokey">{data.name}</span>
            </section>   
          </div>
        </div>
        <hr className="border border-light-royal"/>
        <div className="px-4 py-8">
          <h2 className="font-semibold py-2">Main Menu</h2>
          <nav className="flex flex-col gap-y-2 text-sm">
            <Button 
              label="My Progress" 
              route="/"
            >
              <Atom size={24}/>
            </Button>
            <Button 
              label="Explore Questions" 
              route="/problem-list"
            >
              <ScanSearch size={24} />
            </Button>
            <Button 
              label="Module Notes" 
              route="/module-notes"
            >
              <SquarePen size={24} />
            </Button>
            {data.role === "ADMIN" && 
              <Button 
                label="Add Question" 
                route="/add-question"
              >
                <PackagePlus size={24} />
              </Button>
            }
          </nav>
        </div>
        <hr className="border border-light-royal"/>
        <div className="p-4">
          <div className="flex justify-between items-center">
            <h2 className="font-semibold py-2">Your Sets</h2>
            <button className="bg-light-royal hover:bg-light-murky rounded-md">
              <Plus className="text-aqua"/> 
            </button>
          </div>
          <Setbar />
        </div>
      </div>
      <div className="text-sm">
        <hr className="border border-light-royal"/>
        <div className="p-4">
          <button className="text-murky hover:text-white">
            <div className="h-12 w-full flex items-center gap-x-2 px-4">
              <Cog size={24}/>
              <span>System Settings</span>
            </div>
          </button> 
          <button className="text-murky hover:text-white">
            <div className="h-12 w-full flex items-center gap-x-2 px-4">
              <CircleHelp size={24}/>
              <span>Ask For Help</span>
            </div>
          </button> 
          <button className="text-murky hover:text-white">
            <div className="h-12 w-full flex items-center gap-x-2 px-4">
              <LogOut size={20}/>
              <span>Account Logout</span>
            </div>
          </button> 
        </div>
      </div>
    </div>
  )
}
