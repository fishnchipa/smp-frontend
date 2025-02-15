import Link from "next/link";
import { useSearchParams } from "next/navigation";

type QuestionLinkProps = {
  id: number,
  title: string,
  href: string
}

export default function QuestionLink({id, title, href}: QuestionLinkProps) {
  const searchParams = useSearchParams();

  return (

      <Link
        href={`${href}/${id}?${searchParams.toString()}`}
        className="hover:underline"
      >
        {title}
      </Link>
  )
}
