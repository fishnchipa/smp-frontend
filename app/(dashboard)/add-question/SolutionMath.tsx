
import { useState } from "react";
import SolutionToolbar from "./SolutionToolbar";
import MathText from "./MathText";
import { useEdit } from "@/hooks/useEdit";


export default function SolutionMath() {
  const {setSolution} = useEdit();
  const [state, setState] = useState(''); 

  const upload = () => {
    setSolution(prev => [...prev, {
      type: "MATH",
      value: state
    }]) 
    setState("");
  }

  return (
    <>
      <MathText render={state}/>
      <SolutionToolbar />
      <div 
        className="p-2 w-full border min-h-96 max-h-96 overflow-y-scroll text-black focus:outline-none" 
        contentEditable 
        suppressContentEditableWarning
        onInput={(e) => setState(e.currentTarget.innerText)}
      >
      </div>
      <button 
        className="w-24 group px-3 h-9 border border-aqua hover:border-soft-aqua bg-light-aqua rounded-md text-sm"
        onClick={upload}
      >
        <div className="w-full h-full flex items-center gap-x-2 text-aqua group-hover:text-soft-aqua justify-center">
          Upload
        </div>
      </button>
      <span className="text-sm">Note: The Math Editor uses Katex </span>
    </>

  )
}
