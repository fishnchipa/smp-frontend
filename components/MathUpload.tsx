import { Dispatch, SetStateAction } from "react"


type MathUploadProps = {
  state: string,
  setState: Dispatch<SetStateAction<string>>
  onUpload: (state: string) => void
}

export default function MathUpload({state, setState, onUpload}: MathUploadProps) {

  return (
    <>
      <div 
        className="p-2 w-full border min-h-96 max-h-96 overflow-y-scroll text-black focus:outline-none" 
        contentEditable 
        suppressContentEditableWarning
        onInput={(e) => setState(e.currentTarget.innerHTML)}
      >
      </div>
      <button 
        className="w-24 group px-3 h-9 border border-aqua hover:border-soft-aqua bg-light-aqua rounded-md text-sm"
      >
        <div 
          className="w-full h-full flex items-center gap-x-2 text-aqua group-hover:text-soft-aqua justify-center"
          onClick={() => onUpload(state)}
        >
          Upload
        </div>
      </button>
    </>
  )
}


