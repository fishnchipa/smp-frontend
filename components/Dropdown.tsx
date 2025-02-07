"use client";

import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

type DropdownProps = {
  label: React.ReactNode;
  children?: React.ReactNode;
  isOpen?: boolean;
  className?: string;
};

export default function Dropdown({
  label,
  children,
  className,
  isOpen = false,
}: DropdownProps) {
  const [active, setActive] = useState(isOpen);

  return (
    <div className={cn("w-full", className)}>
      <button
        className="flex flex-row items-center justify-between w-full"
        onClick={() => setActive((prev) => !prev)}
      >
        {label}
        {active ? <ChevronUp /> : <ChevronDown />}
      </button>
      {active && <div className="flex flex-col gap-y-2 p-2">{children}</div>}
    </div>
  );
}

