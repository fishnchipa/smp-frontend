import { cn } from "@/lib/utils"
import { MoveRight } from "lucide-react"
import Link from "next/link"

interface CardProps {
  src: string,
  module: string,
  topic: string,
  main: string,
  secondary: string
}

export default function Card({
  src,
  module,
  topic,
  main,
  secondary
}: CardProps) {

  return (
    <div 
      className={cn("flex flex-col justify-between w-full h-36 rounded-md p-4", secondary, main)}
    >
      <div>
        <h2 className="text-black text-3xl font-bold">Module {module}</h2>  
        <span className="text-black text-sm">{topic}</span>
      </div>
      <Link
        href={src}
      >
        <hr className={cn("my-1", main)}/>
        <div className="flex justify-between items-end">
          <span className="text-sm font-medium">
            View Question
          </span>
          <MoveRight />
        </div>
      </Link>
    </div>
  )
}
