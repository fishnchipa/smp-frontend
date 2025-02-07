import DOMPurify from 'dompurify';
import { useEdit } from "@/hooks/useEdit";
import React, { useState } from "react";
import SolutionToolbar from './SolutionToolbar';

export default function SolutionText() {
  const { setSolution } = useEdit(); 
  const [state, setState] = useState(''); 
  const upload = () => {
    if (state) {
      const value = DOMPurify.sanitize(state);
      setSolution(prev => ([...prev, {
        type: "TEXT", 
        value: value
      }]));
      setState("");
    }
  }
  

  return (
    <>
      <SolutionToolbar />
      <div 
        className="p-2 w-full border min-h-96 max-h-96 overflow-y-scroll text-black focus:outline-none" 
        contentEditable 
        suppressContentEditableWarning
        onInput={(e) => setState(e.currentTarget.innerHTML)}
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
    </>
  )
}
