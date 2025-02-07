import { cn } from "@/lib/utils";
import React, { useState, useRef, useLayoutEffect } from "react";

type ResizableInputProps = {
  content: string,
  setContent: React.Dispatch<React.SetStateAction<string>> ,
  setActive: React.Dispatch<React.SetStateAction<boolean>>
  className?: string
}

export default function ResizableInput({content, className, setContent, setActive}: ResizableInputProps) {
  const [width, setWidth] = useState(50); // Initial width
  const spanRef = useRef<HTMLSpanElement | null>(null);

  useLayoutEffect(() => {
    if (spanRef.current) {
      const newWidth = Math.max(spanRef.current.offsetWidth + 15, 50); 
      setWidth(newWidth);
    }
  }, [content]); // Only update when `content` changes

  return (
    <div className={cn("relative inline-block", className)}>
      <span aria-hidden ref={spanRef} className="absolute invisible opacity-0 whitespace-pre">
        {content || "A"} {/* Ensure at least one character width */}
      </span>
      <input
        type="text"
        style={{ width }}
        value={content}
        className="border px-2 text-3xl"
        onBlur={() => setActive(prev => !prev)}
        autoFocus
        onChange={(e) => setContent(e.target.value)}
      />
    </div>
  );
}

