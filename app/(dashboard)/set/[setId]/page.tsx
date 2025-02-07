import Filter from "@/components/Filter";
import { Download, Forward, RotateCcw } from "lucide-react";
import Progress from "./Progress";
import Link from "next/link";
import Composition from "@/components/Composition";


export default function Home() {



  return (
    <Composition>

      <div className="flex h-full w-full bg-lonely px-5 justify-center overflow-y-scroll">
        <div className="flex w-full max-w-slide mt-10 text-sm gap-x-5">
          <div className="flex flex-col gap-y-5">
            <div className="flex flex-col w-full bg-white rounded-md gap-y-4 p-4 border">
              <section>
                <h1 className="font-bold text-3xl">This is my Set</h1> 
                <span className="text-gray-400">3 questions &bull; Created by 
                  <Link 
                    className="text-aqua"
                    href={"/"}
                  > Wilson Cao</Link>
                </span>
              </section>
              <hr className="border border-light-aqua"/>
              <div className="flex justify-between">
                <h3>Progress</h3>
                <RotateCcw size={18}/>
              </div>
              <Progress />
              <div className="flex gap-x-3">
                <button className="bg-aqua text-white text-sm hover:bg-soft-aqua rounded-md h-10 w-36">
                  Start Virtual Exam
                </button>
                <button className="bg-light-aqua text-aqua rounded-md w-10 flex items-center justify-center hover:text-soft-aqua">
                  <Download size={20}/>
                </button>
                <button className="bg-light-aqua text-aqua rounded-md w-10 flex items-center justify-center hover:text-soft-aqua">
                  <Forward size={20}/>
                </button>
              </div>
            </div>
            <div className="w-full max-w-80">
              <h2 className="h-9 text-3xl font-bold ">Filters</h2>
              <Filter />
            </div>
          </div>
          <div className="w-full">
          </div>
        </div> 
      </div>
    </Composition>
  )
}
