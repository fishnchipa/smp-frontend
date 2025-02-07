
import { Shuffle } from "lucide-react";
import { DataTable } from "./DataTable/DataTable";
import { questionColumns } from "./DataTable/Columns";
import { QuestionType } from "@/lib/schema/QuestionSchema";

type QuestionListProps = {
  data: QuestionType[]
}

export default async function QuestionList({data}: QuestionListProps) {

  return (
    <div className="w-full">
      <div className="flex gap-x-5 text-sm">
        <input 
          placeholder="Search..." 
          className="w-96 h-9 border border-murky rounded-md px-3"
        /> 
        <button className="group px-3 h-9 border border-aqua hover:border-soft-aqua bg-light-aqua rounded-md">
          <div className="w-full h-full flex items-center gap-x-2 text-aqua group-hover:text-soft-aqua">
            <Shuffle size={15}/>
            Pick Random 
          </div>
        </button>
      </div>
      <div className="bg-white mt-2">
        {data && <DataTable columns={questionColumns} data={data}/>}
      </div>
    </div>

  )
}
