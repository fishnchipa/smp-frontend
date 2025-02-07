import { Check } from "lucide-react";

export default function Progress() {


  return (
    <div className="flex gap-x-1 h-32 ">
      <div className="flex flex-col justify-center items-center rounded-md min-w-40 border">
        <span className="text-3xl font-bold">24<span className="text-sm font-normal">/300</span></span>
        <div className="flex text-xs gap-x-1 items-center">
          <Check className="text-easy" size={15}/>
          Solved
        </div>
      </div> 
      <div className="flex flex-col w-full h-full text-xs gap-y-1">
        <button className="flex flex-col items-center justify-center h-full w-full rounded-md border">
          <span className="text-easy">Easy</span> 
          <span>3/18</span>
        </button>
        <button className="flex flex-col items-center justify-center h-full w-full rounded-md border">
          <span className="text-medium">Medium</span> 
          <span>24/400</span>
        </button>
        <button className="flex flex-col items-center justify-center h-full w-full rounded-md border">
          <span className="text-hard">Hard</span> 
          <span>18/36</span>
        </button>
      </div>
    </div>
  )
}
