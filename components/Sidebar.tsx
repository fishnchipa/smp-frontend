
import { Atom, CircleHelp, Cog, LogOut, PackagePlus, Plus, ScanSearch, SquarePen } from "lucide-react";
import Image from "next/image";
import Setbar from "./Setbar";
import Link from "next/link";
import NavLink from "./NavLink";
import { UserType } from "@/lib/schema/UserSchema";
import { logout } from "@/app/action";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { SetRecordType } from "@/lib/schema/SetSchema";

type SidebarProps = {
  data: UserType,
  sets: SetRecordType[]
}

export default function Sidebar({data, sets}: SidebarProps) {

  return (
    <div className="flex flex-col justify-between h-screen min-w-72 max-w-72 bg-royal text-white">
      <div>
        <div className="p-4">
          <div className="pl-12">
            <Image 
              src="/light.png"
              alt="title"
              width={130}
              height={40}
            />
          </div>
          <div className="flex items-center gap-x-3 pt-8 pb-4">
            <div className="w-10 aspect-square rounded-full overflow-hidden relative">
              <Image 
                src="/profile.png" 
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
            <NavLink 
              label="My Progress" 
              route="/"
            >
              <Atom size={24}/>
            </NavLink>
            <NavLink 
              label="Explore Questions" 
              route="/problem-list"
            >
              <ScanSearch size={24} />
            </NavLink>
            <NavLink 
              label="Module Notes" 
              route="/module-notes"
            >
              <SquarePen size={24} />
            </NavLink>
            {data.role === "ADMIN" && 
              <NavLink 
                label="Add Question" 
                route="/add-question"
              >
                <PackagePlus size={24} />
              </NavLink>
            }
          </nav>
        </div>
        <hr className="border border-light-royal"/>
        <div className="p-4">
          <div className="flex justify-between items-center">
            <h2 className="font-semibold py-2">Your Sets</h2>
            <Dialog>
              <DialogTrigger asChild>
                <button 
                  className="bg-light-royal hover:bg-light-murky rounded-md"
                >
                  <Plus className="text-aqua"/> 
                </button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create A Set</DialogTitle>
                  <form className="flex flex-col pt-5 pb-2 text-sm items-end gap-y-3">
                    <label className="w-full">
                      Name
                      <input className="ring-0 outline-none rounded-md w-full"/>
                    </label>
                    <button 
                      className="w-fit bg-aqua text-white text-center px-4 py-2 rounded-md hover:bg-soft-aqua"
                    >
                      Create
                    </button>
                  </form>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </div>
          <Setbar sets={sets}/>
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
          <button className="text-murky hover:text-white" onClick={logout}>
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
