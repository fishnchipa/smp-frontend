"use client"

import { parseRoute } from "@/lib/utils";
import { X } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function TagParams() {
  const [tags, setTags] = useState<string[]>([]);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const values = searchParams.getAll("tags").map(item => item.replaceAll("-", " ")); 
    setTags(values);
  }, [searchParams])

  const removeTag = (title: string) => {
    const name = parseRoute(title);
    const params = new URLSearchParams(searchParams.toString());
    params.delete("tags", name);
    router.push(pathname + "?" + params.toString()); 
  }


  return (

    <div className="flex flex-wrap gap-2">
      {tags.map((item, key) => {
        const title = item.replace("-", " ");
        return (
          <span
            key={key}
            className="flex gap-x-2 h-7 rounded-3xl bg-light-smokey px-3 text-center items-center hover:text-black"
          >
            {title} 
            <button onClick={() => removeTag(item)}>
              <X size={12}/>
            </button>
          </ span>
        )
      })}
    </div>
  )
}
