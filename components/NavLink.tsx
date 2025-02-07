"use client"

import { parseRoute } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";


interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string, 
  route: string,
}

export default function NavLink({
  label, 
  route,
  children,
  ...props
}: ButtonProps) {
  const router = useRouter();
  const pathname = usePathname();
  const active = parseRoute(route) === parseRoute(pathname);
  const enabled = "border border-white rounded-md bg-aqua"
  const disabled = "border border-transparent text-murky hover:text-white"

  return (
    <button 
      className={ active ? enabled : disabled } 
      onClick={() => router.push(route)}
      {...props}
    >
      <div className="h-12 w-full flex items-center gap-x-2 px-4 ">
        {children}
        <span>{label}</span>
      </div>
    </button>
  )
}
