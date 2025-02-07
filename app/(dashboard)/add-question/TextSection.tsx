import DOMPurify from 'dompurify';
import { useEdit } from "@/hooks/useEdit";
import React from "react";

export default function TextSection({
  divRef
}: {
  divRef: React.RefObject<HTMLDivElement | null>
}) {
  const { setContent } = useEdit(); 
 
  const upload = () => {
    if (divRef.current) {
      const value = DOMPurify.sanitize(divRef.current.innerHTML);
      setContent(prev => ([...prev, {
        type: "SECTION", 
        value: value
      }]));
      divRef.current.innerHTML = "";
    }
  }
  

  return (
    <>
      <span>Description</span>
      <div 
        className="p-2 w-full border min-h-96 max-h-96 overflow-y-scroll text-black focus:outline-none" 
        contentEditable 
        suppressContentEditableWarning
        ref={divRef}
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
