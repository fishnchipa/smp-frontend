"use client"
import Topic from "@/app/(dashboard)/add-question/Topic";
import { TagType } from "@/lib/schema/QuestionSchema";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function TopicSearch() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const handleSearch = (tag: TagType) => {
    const params = new URLSearchParams(searchParams.toString());
    if (!params.has("tags", tag.name)) {
      params.append("tags", tag.name);
      router.push(pathname + "?" +  params.toString());
    }
  }

  return (
    <Topic handleTagChange={handleSearch}/>
  )
}
