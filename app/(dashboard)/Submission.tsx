import { historyColumns } from "@/components/DataTable/Columns";
import { DataTable } from "@/components/DataTable/DataTable";
import { getSubmissions } from "@/lib/data/submission";

export default async function Submission() {
  const data = await getSubmissions();

  return (
    <div className="max-w-slide w-full flex flex-col xl:flex-row gap-5 ">
      <div className="w-full">
        <h2 className="text-2xl font-bold">Recent Questions Solved</h2>
        {data && <DataTable columns={historyColumns} data={data}/>} 
      </div>
    </div>
  )
}
