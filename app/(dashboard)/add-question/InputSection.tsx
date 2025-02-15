import DOMPurify from 'dompurify';
import { useEdit } from "@/hooks/useEdit";
import React, { useState } from "react";
import { UnitType } from '@/lib/schema/QuestionSchema';
import { Minus } from 'lucide-react';


function MultiResponse({divRef}: {divRef: React.RefObject<HTMLDivElement | null>}) { 
  const {setContent} = useEdit();
  const [question, setQuestion] = useState("");
  const [choices, setChoices] = useState<string[]>(["", "", "", ""]);
  const [answer, setAnswer] = useState(0);

  const upload = () => {
    if (divRef.current) {
      const safe = DOMPurify.sanitize(question);      
      setContent(prev => ([...prev, {
        type: "RESPONSE_MULTIPLE",
        value: {
          question: safe,
          choice: choices,
          answer: answer.toString()
        }
      }]));
      divRef.current.innerHTML = "";
      setChoices(prev => prev.map(() => ""));
    }
  }


  return (
    <>
      <span>Question</span>
      <div 
        className="p-2 w-full border min-h-96 max-h-96 overflow-y-scroll text-black" 
        contentEditable 
        suppressContentEditableWarning
        onInput={(e) => setQuestion(e.currentTarget.innerHTML)}
        ref={divRef}
      >
      </div>
      <div className="flex justify-between mt-3">
        <span>Choices</span>
        <button
          onClick={() => setChoices(prev => [...prev, ""])}
        >Add Choice</button>
      </div>
      {choices.map((item, index) => (
        <div
          key={index} 
          className="flex relative w-full items-center "
        >
          <input 
            placeholder={`Choice ${index}`} 
            className="border text-black text-sm w-full"
            value={item}
            onChange={(e) => {
              const newValue = e.currentTarget.value || "";
              setChoices(prev => prev.map((value, i) => index === i ? newValue : value))
            }}
          />
          <button 
            className="absolute right-5"
            onClick={(e) => {
              e.stopPropagation();
              setChoices(prev => prev.filter((_, i) => index !== i))

            }}
          >
            <Minus size={20}/>
          </button>
        </div>
      ))}

      <span>Answer</span>
      <select 
        className="text-sm text-black"
        onChange={(e) => setAnswer(parseInt(e.currentTarget.value))}
      >
        {choices.map((_, index) => (
          <option 
            key={index}
            value={index+1}
          >
              Choice {index+1}
            </option>
        ))}
      </select>
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

function FreeResponse({divRef}: {divRef: React.RefObject<HTMLDivElement | null>}) {
  const { setContent } = useEdit();
  const [unit, setUnit] = useState<UnitType>("TEXT")
  const [answer, setAnswer] = useState('')
  const [question, setQuestion] = useState('')
  const [lines, setLines] = useState('');

  const upload = () => {
    if (divRef.current) {
      const safe = DOMPurify.sanitize(question);      
      setContent(prev => ([...prev, {
        type: "RESPONSE_FREE",
        value: {
          question: safe,
          unit: unit,
          lines: Number(lines) || 3,
          answer: answer
        }
      }]));
      divRef.current.innerHTML = "";
      setAnswer("");
    }
  }

  return (
    <>
      <span>Question</span>
      <div 
        className="p-2 w-full border min-h-96 max-h-96 overflow-y-scroll text-black" 
        contentEditable 
        suppressContentEditableWarning
        onInput={(e) => setQuestion(e.currentTarget.innerHTML)}
        ref={divRef}
      >
      </div>

      <div>
        <span>Number of lines</span>
        <input 
          className="p-2 w-full border min-h-10 max-h-10 overflow-y-scroll border-[#e5e7eb] text-black text-sm" 
          value={lines}
          onChange={(e) => {
            const value = e.currentTarget.value;
            if (value === '' || !isNaN(Number(value))) {
              setLines(value);
            }
          }}
        />

      </div>
      <div className="flex gap-x-2">
        <div className="w-full basis-2/3">
          <span>Answer</span>
          <input 
            className="p-2 w-full border min-h-10 max-h-10 overflow-y-scroll border-[#e5e7eb] text-black text-sm" 
            value={answer}
            onChange={(e) => setAnswer(e.currentTarget.value)}
          />
        </div>
        <div className="w-full basis-1/3">
          <span>Unit</span>
          <select 
            className="w-full border border-[#e5e7eb] focus:border-[#e5e7eb] outline-[#e5e7eb] text-sm text-black"
            defaultValue={unit}
            onChange={(e) => setUnit(e.currentTarget.value as UnitType)}
          >
            <option value="TEXT">Text</option>
            <option value="TIME">Time</option>
            <option value="DIRECTION">Direction</option>
            <option value="DISPLACEMENT">Displacement</option>
            <option value="VELOCITY">Velocity</option>
            <option value="ACCELERATION">Acceleration</option>
            <option value="MASS">Mass</option>
            <option value="ELECTRONVOLT">Electron Volt</option>
            <option value="VOLTAGE">Voltage</option>
            <option value="AMPERE">Ampere</option>
            <option value="JOULES">Joules</option>
            <option value="WAVELENGTH">Wavelength</option>
          </select>
          {unit === "TEXT" && <span className="text-sm">Note: All answers are accepted as correct</span>}
        </div>
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

export default function InputSection({divRef}: {divRef: React.RefObject<HTMLDivElement | null>}) {
  const { input } = useEdit()
  
  return (
    <>
      { input === "RESPONSE_FREE" ? (<FreeResponse divRef={divRef}/>) : (<MultiResponse divRef={divRef}/>)}
    </>
  )
}
