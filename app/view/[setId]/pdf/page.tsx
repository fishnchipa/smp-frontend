import { getCollection } from "@/lib/data/collection";
import { cookies } from "next/headers";
import Wrapper from "./Wrapper";


type tParams = Promise<{ setId: string }>;

export default async function Home({params}: {params: tParams}) {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("session"); 
  const {setId} = await params;
  const data = await getCollection(setId);

  return (
    <div className="w-full h-full flex justify-center">
      <Wrapper data={data} sessionCookie={sessionCookie}/>
    </div>
  );

}
