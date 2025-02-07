import { RefObject, useState } from "react"

type SectionUploadProps = {
  divRef: RefObject<HTMLDivElement>,
  onUpload: (input: string) => void
}

export default function SectionUpload({divRef, onUpload}: SectionUploadProps) {
  const [state, setState] = useState("");

  return (
    <>
      <div 
        className="p-2 w-full border min-h-96 max-h-96 overflow-y-scroll text-black focus:outline-none" 
        contentEditable 
        suppressContentEditableWarning
        onInput={(e) => setState(e.currentTarget.innerHTML)}
        ref={divRef}
      >
      </div>
      <button 
        className="w-24 group px-3 h-9 border border-aqua hover:border-soft-aqua bg-light-aqua rounded-md text-sm"
        onClick={() => onUpload(state)}
      >
        <div className="w-full h-full flex items-center gap-x-2 text-aqua group-hover:text-soft-aqua justify-center">
          Upload
        </div>
      </button>
    </>
  )
}
