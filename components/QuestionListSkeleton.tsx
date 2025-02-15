import { Shuffle } from "lucide-react";
import { DataTable } from "./DataTable/DataTable";
import { ColumnDef } from "@tanstack/react-table";


interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
}

export function QuestionListSkeleton<TData, TValue>({columns}: DataTableProps<TData, TValue>) {
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
        <DataTable columns={columns} data={[]}/>
      </div>
    </div>
  )
}
