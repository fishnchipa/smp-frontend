
import { historyColumns } from "@/components/DataTable/Columns";
import { DataTable } from "@/components/DataTable/DataTable";
import Card from "./Card";
import React from "react";
import Composition from "@/components/Composition";
import { getSubmissions } from "@/lib/data/submission";

export default async function Home() {

  const data = await getSubmissions();

  return (
    <Composition>
      <div className="flex flex-col gap-y-5 h-full w-full bg-lonely px-5 items-center overflow-y-scroll">
        <div className="max-w-slide w-full flex flex-col gap-y-5 mt-10">
          <h1 className="text-4xl font-bold">My Progress</h1>
          <div className="grid xl:grid-cols-4 lg:grid-cols-2 grid-cols-1 gap-5">
            <Card
              src="/problem-list?modules=advanced-mechanics"
              module="5"
              topic="Advanced Mechanics"
              main="border border-aqua"
              secondary="bg-light-aqua text-aqua"
            />
            <Card 
              src="/problem-list?modules=electromagnetism"
              module="6"
              topic="Electromagnetism"
              main="border border-violet"
              secondary="bg-light-violet text-violet"
            />
            <Card 
              src="/problem-list?modules=the-nature-of-light"
              module="7"
              topic="The Nature of Light"
              main="border border-ocean"
              secondary="bg-light-ocean text-ocean"
            />
            <Card 
              src="/problem-list?modules=from-the-universe-to-the-atom"
              module="8"
              topic="From the Universe to the Atom"
              main="border border-gold"
              secondary="bg-light-gold text-gold"
            />
          </div>
        </div>
        <div className="max-w-slide w-full flex flex-col xl:flex-row gap-5 ">
          <div className="w-full">
            <h2 className="text-2xl font-bold">Recent Questions Solved</h2>
            <React.Suspense fallback={(<div>Loading</div>)}>
              {data && <DataTable columns={historyColumns} data={data}/>} 
            </React.Suspense>
          </div>
        </div>
      </div>
    </Composition>
  );
}

