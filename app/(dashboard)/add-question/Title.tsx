import ResizableInput from "@/components/ResizableInput";
import { useEdit } from "@/hooks/useEdit";
import { Pencil } from "lucide-react";
import { useState } from "react"

export default function Title() {
  const [active, setActive] = useState(false);
  const {title, setTitle} = useEdit();

  return (
    <div className="text-3xl font-bold">
      {active ? (
        <ResizableInput 
          content={title}
          setContent={setTitle}
          setActive={setActive}
          className="text-3xl"
        />
      ) : (
        <div 
          className="flex items-center justify-center w-fit h-[54px] px-2 gap-x-5 hover:cursor-pointer pl-[9px]" 
          onDoubleClick={() => setActive(prev => !prev)}
        >
          <h1>{title} </h1>
          <Pencil size={20} className="text-black"/>
        </div>
      )} 
    </div> 
  )
}
