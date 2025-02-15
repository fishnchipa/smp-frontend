import { setColumns } from "@/components/DataTable/Columns";
import { Suspense } from "react";
import SetSkeleton from "./SetSkeleton";
import { DataTable } from "@/components/DataTable/DataTable";


export default async function Home() {

  return (
    <div className="flex flex-col gap-y-5 h-full w-full bg-lonely px-5 items-center overflow-y-scroll">
      
      <div className="max-w-slide w-full flex flex-col gap-y-5 mt-10">
        <h1 className="text-4xl font-bold">Saved Sets</h1>
        <Suspense fallback={<DataTable columns={setColumns} data={[]}/>}>
          <SetSkeleton />
        </Suspense>
      </div>
    </div>
  )
}
