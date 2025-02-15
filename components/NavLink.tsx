"use client"

import { parseRoute } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";


interface NavLinkProps {
  label: string, 
  route: string,
  children: ReactNode
}

export default function NavLink({
  label, 
  route,
  children,
  ...props
}: NavLinkProps) {
  const pathname = usePathname();
  const active = parseRoute(route) === parseRoute(pathname);
  const enabled = "border border-white rounded-md bg-aqua"
  const disabled = "border border-transparent text-murky hover:text-white"

  return (
    <Link 
      className={ active ? enabled : disabled } 
      href={route}
      {...props}
    >
      <div className="h-12 w-full flex items-center gap-x-2 px-4 ">
        {children}
        <span>{label}</span>
      </div>
    </Link>
  )
}
