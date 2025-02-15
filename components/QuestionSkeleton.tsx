import { Skeleton } from "@/components/ui/skeleton";
import { ChevronRight } from "lucide-react";

export default function QuestionSkeleton() {
  return (
    <div className="h-full flex flex-col w-full bg-lonely overflow-y-scroll pb-20">
      <div className="flex gap-x-3 text-sm items-center p-4">
        <Skeleton className="w-10 h-3 rounded-sm bg-soft-aqua"/>
        <ChevronRight size={15}/>
        <Skeleton className="w-10 h-3 rounded-sm bg-smokey"/>
      </div>
      <div className="flex justify-center w-full">
        <div className="flex flex-col max-w-page bg-white w-full py-10 px-16 rounded-xl">
          <div className="flex justify-between">
            <span className="font-bold text-3xl whitespace-nowrap">
              <Skeleton className="h-10 w-52"/>
            </span> 
            <div className="flex gap-x-3 items-center text-sm">
              <Skeleton className="h-7 w-20"/>
              <Skeleton className="h-7 w-20"/>
            </div>
          </div>
          <div className="flex gap-x-3 mt-2">
            <Skeleton className="h-7 w-20 rounded-3xl"/>
            <Skeleton className="h-7 w-20 rounded-3xl"/>
            <Skeleton className="h-7 w-20 rounded-3xl"/>
          </div>
          <div className="mt-10">
            <hr />
            <Skeleton className="h-32 w-full mt-10"/>
            <div className="flex items-center justify-center w-full gap-x-10">
              <Skeleton className="h-60 w-full mt-10"/>
              <Skeleton className="h-60 w-full mt-10"/>
            </div>
          </div>
            <Skeleton className="h-96 w-full mt-10"/>
        </div>
      </div>
    </div>
  )
}
