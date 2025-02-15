import { CircleCheck, CircleHelp } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";
import { FreeAnswerType, UnitType } from "@/lib/schema/QuestionSchema";
import { useForm } from "@/hooks/useForm";
import { useRef } from "react";
import Textbar from "@/app/(dashboard)/question/[questionId]/Textbar";


function Help({status}: {status: UnitType}) {
  
  switch (status) {
    case "BOOLEAN":
      return (
        <span className="text-murky">Answer: 
          <span className="text-black ml-1">True / False</span>
        </span>
    )
    case "TIME": 
      return (
        <span className="text-murky">Answer: 
          <span className="text-black ml-1">?? s</span>
        </span>
      )
    case "DIRECTION":
      return (
        <span className="text-murky">Answer: 
          <span className="text-black ml-1">??<sup>o</sup></span>
        </span>
      )
    case "DISPLACEMENT":
      return (
        <span className="text-murky">Answer: 
          <span className="text-black ml-1">?? m</span>
        </span>
      )
    case "VELOCITY":
      return (
        <span className="text-murky">Answer: 
          <span className="text-black ml-1">?? ms<sup>-1</sup></span>
        </span>
      )
    case "ACCELERATION":
      return (
        <span className="text-murky">Answer: 
          <span className="text-black ml-1">?? ms<sup>-2</sup></span>
        </span>
      )
    case "TEXT":
      return (
        <span className="text-murky">Answer: 
          <span className="text-black ml-1">Answer</span>
        </span>
      )
    case "MASS":
      return (
        <span className="text-murky">Answer: 
          <span className="text-black ml-1">?? kg</span>
        </span>
      )
    case "ELECTRONVOLT":
      return (
        <span className="text-murky">Answer: 
          <span className="text-black ml-1">?? eV</span>
        </span>
      )
    case "VOLTAGE":
      return (
        <span className="text-murky">Answer: 
          <span className="text-black ml-1">?? V</span>
        </span>
      )
    case "AMPERE":
      return (
        <span className="text-murky">Answer: 
          <span className="text-black ml-1">?? A</span>
        </span>
      )
    case "JOULES":
      return (
        <span className="text-murky">Answer: 
          <span className="text-black ml-1">?? J</span>
        </span>
      )
    case "WAVELENGTH":
      return (
        <span className="text-murky">Answer: 
          <span className="text-black ml-1">?? nm</span>
        </span>
      )
  }
}


export default function Answer({data, index}: {data: FreeAnswerType, index: number}) {
  const {errors, submission, setFormData} = useForm();
  const divRef = useRef<HTMLDivElement>(null);

  return (
    
    <div className="flex gap-x-2">
      <div className="flex flex-col w-full">
        <div className="flex gap-x-2 w-full pr-2 items-start justify-between">
          <div className="flex flex-col w-full basis-2/3 gap-y-2 border-black">
            <Textbar divRef={divRef}/> 
            <div 
              className="p-2 w-full border min-h-40 max-h-40 overflow-y-scroll text-sm text-black focus:outline-none" 
              contentEditable 
              suppressContentEditableWarning
              onInput={(e) => {
                const value = e.currentTarget.innerText
                setFormData(prev => {
                  return {
                    ...prev,
                    [index.toString()]: value
                  }
                })
              }}
            >
            </div>
            {submission && !errors[index.toString()] && (<CircleCheck className="text-emerald-400"/>)}
          </div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger disabled>
                <CircleHelp className="text-gray-300 hover:text-gray-500 hover:cursor-pointer "/>
              </TooltipTrigger>
              <TooltipContent>
                <Help status={data.value.unit}/>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        {errors[index.toString()] && <span className="text-red-500">Incorrect Answer</span>}
      </div>

    </div>
  )
}
