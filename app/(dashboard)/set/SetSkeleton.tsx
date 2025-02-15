import { setColumns } from "@/components/DataTable/Columns";
import { DataTable } from "@/components/DataTable/DataTable";
import { getCollectionList } from "@/lib/data/collection";

export default async function SetSkeleton() {
  const data = await getCollectionList();
  return (
    <DataTable columns={setColumns} data={data}/>
  )
}
