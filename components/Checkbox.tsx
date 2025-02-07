"use client";

import { cn, parseRoute } from "@/lib/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  filter: string,
  className?: string;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, className, filter, ...props }, ref) => {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();
    const [checked, setChecked] = useState(false);

    useEffect(() => {
      setChecked(searchParams.has(filter , parseRoute(label)));
    }, [searchParams, label, filter]);

    const updateQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
      const params = new URLSearchParams(searchParams.toString());
      if (e.currentTarget.checked) {
        params.append(filter, parseRoute(label));
      } else {
        params.delete(filter, parseRoute(label));
      }

      router.push(pathname + "?" + params.toString(), { scroll: false });
    };

    return (
      <label
        className={cn(
          "flex flex-row gap-x-2 items-center",
          className,
        )}
      >
        <input
          className="focus:ring-transparent text-aqua rounded-sm w-4 h-4 bg-light-aqua border border-smokey"
          type="checkbox"
          checked={checked}
          onChange={updateQuery}
          value={label}
          ref={ref}
          {...props}
        />
        {label}
      </label>
    );
  },
);

Checkbox.displayName = "Checkbox";
export default Checkbox;

