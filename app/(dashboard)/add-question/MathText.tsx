"use client"

import { useEffect, useRef } from "react"
import katex from "katex";
import "katex/dist/katex.min.css";

export default function MathText({render = ""}: {render: string}) {
  const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      if (containerRef.current) {
        katex.render(render, containerRef.current, {
          throwOnError: false,
          displayMode: true, 
        });
      }
    }, [render]);

  return (

    <div ref={containerRef} className="w-full overflow-hidden relative text-black "
    >
    </div>
  )
}
