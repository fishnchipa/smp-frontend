import { useState } from "react";

import { AlignLeft, CopyCheck, Image as ImageIcon, Package, Subscript, Superscript, Type } from "lucide-react";
import { useEdit } from "@/hooks/useEdit";


type ToolbarProps = {
  divRef: React.RefObject<HTMLDivElement | null>
}

export default function Toolbar({ divRef }: ToolbarProps) {
  const [activeSup, setActiveSup] = useState(false); 
  const {input, option, setOption, setInput} = useEdit();

  const insertSup = () => {
    const selection = window.getSelection();
    if (!selection || !selection.rangeCount) return;

    const range = selection.getRangeAt(0);
    const sup = document.createElement("sup");
    sup.innerHTML = "\u200B"; // Zero-width space to allow typing

    range.deleteContents();
    range.insertNode(sup);

    // Move cursor inside the <sup> tag
    range.setStart(sup, 1);
    range.collapse(true);

    selection.removeAllRanges();
    selection.addRange(range);
    divRef.current?.focus();
  };

  const exitSup = () => {
    const selection = window.getSelection();
    if (!selection || !selection.rangeCount) return;

    let range = selection.getRangeAt(0);
    let { startContainer } = range;

    // Ensure we are working with an element
    if (startContainer.nodeType === Node.TEXT_NODE) {
      startContainer = startContainer.parentNode!;
    }

    // If inside <sup>, move cursor outside
    if (startContainer.nodeName === "SUP") {
      const supElement = startContainer;

      // Create a new text node after <sup> to ensure cursor placement
      const textNode = document.createTextNode("\u200B"); // Zero-width space
      supElement.parentNode?.insertBefore(textNode, supElement.nextSibling);

      // Move cursor to the new text node
      range = document.createRange();
      range.setStart(textNode, 1);
      range.collapse(true);

      selection.removeAllRanges();
      selection.addRange(range);
      divRef.current?.focus();
    }
  };

  const activateSuper = () => {
    if (activeSup) {
      exitSup();
    } else {
      insertSup();
    }

    setActiveSup(prev => !prev);
  }
  
  return (
      <div className="flex border h-10 items-center px-3 gap-x-10">
        <div className="flex items-center gap-x-3">
          <button 
            className="hover:text-aqua"
            onClick={() => setOption("TEXT")}
          >
            <Type size={20} className={option === "TEXT" ? "text-aqua" : ""}/> 
          </button>
          <button 
            className="hover:text-aqua "
            onClick={() => setOption("IMAGE")}
          >
            <ImageIcon size={20} className={option === "IMAGE" ? "text-aqua" : ""} />
          </button>
          <button 
            className="hover:text-aqua"
            onClick={() => setOption("INPUT")}
          >
            <Package size={20} className={option === "INPUT" ? "text-aqua" : ""}/>
          </button>
        </div>
        {option === "INPUT" && (
          <div className="flex items-center gap-x-3">
            <button 
              className="hover:text-aqua"
              onClick={() => setInput("RESPONSE_FREE")}
            >
              <AlignLeft size={20} className={input === "RESPONSE_FREE" ? "text-aqua" : ""}/>
            </button>
            <button 
              className="hover:text-aqua"
              onClick={() => setInput("RESPONSE_MULTIPLE")}

            >
              <CopyCheck size={20}  className={input === "RESPONSE_MULTIPLE" ? "text-aqua" : ""}/>
            </button>
          </div>
        )}

        {option !== "IMAGE" && (
          <div className="flex items-center gap-x-3">
            <button 
              className="hover:text-aqua "
              onClick={activateSuper}
            >
              <Superscript size={20}  className={activeSup ? "text-aqua" : ""}/>
            </button>
            <button className="hover:text-aqua ">
              <Subscript size={20}/>
            </button>
          </div>
        )}
      </div>
  )
}
