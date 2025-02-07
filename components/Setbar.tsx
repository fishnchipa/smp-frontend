import Link from "next/link"
import Pulse from "./Pulse"

type Set = {
  id: string,
  title: string,
  theme: "green" | "purple" | "blue"
}

export default function Setbar() {


  const sets: Set[] = []

  return (
    <nav className="flex flex-col px-4 gap-y-6 text-sm py-2 ">
      {sets.map(set => (
        <Link
          key={set.id}
          href={`/set/${set.id}`}
          className="flex gap-x-2 items-center text-murky hover:text-white group"
        >
          <Pulse theme={set.theme}/>
          {set.title}
        </Link>
      ))} 
       
    </nav>
  )
}
