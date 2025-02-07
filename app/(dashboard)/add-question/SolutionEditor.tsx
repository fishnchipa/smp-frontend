import React  from "react";
import { useEdit } from "@/hooks/useEdit";
import { SolutionType } from "@/lib/schema/SolutionSchema";
import MathText from "./MathText";
import { SolutionState } from "@/providers/EditProvider";
import SolutionMath from "./SolutionMath";
import SolutionText from "./SolutionText";
import SolutionToolbar from "./SolutionToolbar";


export default function SolutionEditor() {
  const { solution, solutionState } = useEdit();
  return (
    <div className="w-full flex flex-col gap-y-2 text-gray-500">
      <div>
        {solution.map((item, index) => (
          <SolutionParser key={index} solution={item}/>
        ))}
      </div>
      <SolutionEditorParser solution={solutionState}/>
    </div>
  )
}

function SolutionEditorParser({solution}: {solution: SolutionState}) {
  if (solution === "MATH") {
    return (
      <SolutionMath />
    )
  } else if (solution === "TEXT") {
    return (
      <SolutionText /> 
    )
  } else {
    return (
      <>
        <SolutionToolbar />
      </>
    )
  }
}

export function SolutionParser({solution}: {solution: SolutionType}) {
  if (solution.type === "TEXT") {
    return (
      <div dangerouslySetInnerHTML={{__html: solution.value}}>
      </div>
    )
  } else if (solution.type === "MATH") {
    return (
      <MathText render={solution.value}/>
    )
  }
   
}
