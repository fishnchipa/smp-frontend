
import React, { useCallback, useEffect, useState } from "react";

import { Subscript, Superscript } from "lucide-react";


type ToolbarProps = {
  divRef: React.RefObject<HTMLDivElement | null>
}

export default function Textbar({ divRef }: ToolbarProps) {
  const [activeSup, setActiveSup] = useState(false); 

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

  const checkIfInsideSup = useCallback(() => {
    const selection = window.getSelection();
    if (!selection || !selection.rangeCount) {
      setActiveSup(false);
      return;
    }

    let node = selection.anchorNode;
    if (node?.nodeType === Node.TEXT_NODE) {
      node = node.parentNode; // Get parent if inside a text node
    }

    setActiveSup(node?.nodeName === "SUP");
  }, []);

  useEffect(() => {
    const handleSelectionChange = () => {
      checkIfInsideSup();
    };

    document.addEventListener("selectionchange", handleSelectionChange);
    return () => {
      document.removeEventListener("selectionchange", handleSelectionChange);
    };
  }, [checkIfInsideSup]);

  const activateSuper = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
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
            type="button"
            className="hover:text-aqua "
            onClick={activateSuper}
          >
            <Superscript size={20}  className={activeSup ? "text-aqua" : ""}/>
          </button>
          <button className="hover:text-aqua ">
            <Subscript size={20}/>
          </button>
        </div>
      </div>
  )
}
