import { ChevronLeft, ChevronRight } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { z } from "zod";

export default function Pagination() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const prev = () => {
    const page = searchParams.get("page");
    const params = new URLSearchParams(searchParams.toString());

    if (page) {
      const parsedPage = z.number().safeParse(parseInt(page));

      if (parsedPage.success) {
        const newPage = parsedPage.data - 1;
        if (newPage === 0) {
          params.delete("page");
        } else {
          params.set("page", newPage.toString());
        }
      }
    }
    router.push(pathname + "?" + params.toString());
  };

  const next = () => {
    const page = searchParams.get("page");
    const params = new URLSearchParams(searchParams.toString());

    if (page) {
      const parsedPage = z.number().safeParse(parseInt(page));

      if (parsedPage.success) {
        const newPage = parsedPage.data + 1;
        if (newPage === 0) {
          params.delete("page");
        } else {
          params.set("page", newPage.toString());
        }
      }
    } else {
      params.set("page", "1");
    }

    router.push(pathname + "?" + params.toString());
  };

  return (
      <div className="flex w-full justify-end gap-x-4 text-sm mt-2">
        <button 
          className="flex items-center pr-4 pl-2 py-2 hover:bg-gray-200 rounded-md"
          onClick={prev}
        >
          <ChevronLeft size={18}/>Previous
        </button>
        <button 
          className="flex items-center pl-4 pr-2 py-2 hover:bg-gray-200 rounded-md"
          onClick={next}
        >
          Right<ChevronRight size={18}/>
        </button>
      </div>

  )
}
