"use client"

import { useEdit } from "@/hooks/useEdit";
import { Image as ImageIcon, Sigma, Type } from "lucide-react";

export default function SolutionToolbar() {
  
  const {solutionState, setSolutionState} = useEdit();

  return (
    <div className="flex border h-10 items-center px-3 gap-x-10">
      <div className="flex items-center gap-x-3">
        <button 
          className="hover:text-aqua"
          onClick={() => setSolutionState("TEXT")}
        >
          <Type size={20} className={solutionState === "TEXT" ? "text-aqua" : ""}/> 
        </button>
        <button 
          className="hover:text-aqua "
          onClick={() => setSolutionState("IMAGE")}
        >
          <ImageIcon size={20} className={solutionState === "IMAGE" ? "text-aqua" : ""} />
        </button>
        <button 
          className="hover:text-aqua "
          onClick={() => setSolutionState("MATH")}
        >
          <Sigma size={20} className={solutionState === "MATH" ? "text-aqua" : ""} />
        </button>
      </div>
    </div>
  )
}
