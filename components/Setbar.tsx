import Link from "next/link"
import Pulse from "./Pulse"
import { SetRecordType } from "@/lib/schema/SetSchema"

type SetbarProps = {
  sets: SetRecordType[]
}

export default function Setbar({sets}: SetbarProps) {

  return (
    <nav className="flex flex-col px-4 gap-y-6 text-sm py-2 ">
      {sets.map((set, index) => (
        <Link
          key={set.id}
          href={`/set/${set.id}`}
          className="flex gap-x-2 items-center text-murky hover:text-white group"
        >
          <Pulse num={index} />
          {set.name}
        </Link>
      ))} 
      <Link href="/set" className="text-gray-500 hover:text-white text-center">View All</Link> 
    </nav>
  )
}
