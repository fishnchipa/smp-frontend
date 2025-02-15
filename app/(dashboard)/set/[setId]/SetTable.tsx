"use client"

import { questionColumns } from "@/components/DataTable/Columns";
import { DataTable } from "@/components/DataTable/DataTable";
import { SetType } from "@/lib/schema/SetSchema";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";

export default function SetTable({data, session}: {data: SetType, session: RequestCookie | undefined}) {

  return (

    <div className="flex flex-col gap-x-5">
      <DataTable columns={questionColumns(`/set/${data.id}/question`, session, data.id)} data={data.questions}/>
    </div>
  )
}
