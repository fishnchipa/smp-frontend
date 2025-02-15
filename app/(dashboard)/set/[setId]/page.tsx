import { getCollection } from "@/lib/data/collection";
import Link from "next/link";
import SetTable from "./SetTable";
import { cookies } from "next/headers";


type tParams = Promise<{ setId: string }>;

export default async function Home({params}: {params: tParams}) {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("session"); 
  const {setId} = await params;
  const data = await getCollection(setId);

  return (
    <div className="flex flex-col gap-y-5 h-full w-full bg-lonely px-5 items-center overflow-y-scroll">
      {data ?
        <div className="max-w-slide w-full flex flex-col gap-y-5 mt-10">
          <div className="flex">
            <div className="flex flex-col w-fit">
              <h1 className="text-4xl font-bold">{data.name}</h1>
              <span 
                className="whitespace-nowrap"
              >
                Created By: <Link className="text-aqua hover:underline" href={`/`}>{data.user}</Link>
              </span>
            </div>
            <div className="w-full flex justify-end gap-x-2 py-2 text-sm items-end">   
              <Link 
                href={`/view/${setId}/pdf`} 
                legacyBehavior
              >
                <a 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-fit h-fit bg-aqua text-white text-center px-4 py-2 rounded-md hover:bg-soft-aqua"
                >
                  View As Pdf
                </a>
              </Link>
              <button 
                className="w-fit h-fit bg-red-500 text-white text-center px-4 py-2 rounded-md hover:bg-red-400"
              >
                Delete Set
              </button>
            </div> 
          </div>
          <SetTable data={data} session={sessionCookie}/>
        </div>
      : 
        <div className="flex items-center justify-center w-full text-4xl font-bold pt-10">
          Set Not Found 
        </div>
    }
    </div>
  )
}
