"use client";

import { cn } from "@/lib/utils";
import { forwardRef, InputHTMLAttributes, useEffect, useState } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  initial?: string | number;
  label?: string;
  name: string;
  error?: {
    message: string
  };
  className?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, name, initial, label, error, ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false);
    const handleFocus = () => setIsFocused(true);

    useEffect(() => {
      if (initial) {
        handleFocus();
      }
    }, [initial]);

    return (
      <div className={cn("w-full relative group flex flex-col", className)}>
        <input
          ref={ref}
          name={name}
          autoComplete="off"
          defaultValue={initial}
          {...props}
          onFocus={handleFocus}
          className="w-full h-[50px] bg-transparent border border-gray-400 rounded-md pl-2 focus:ring-0 ring-0 outline-none transition-all duration-400 ease-in-out transform focus:border-[#FAA500] focus:outline-none"
        />
        {label && (
          <span
            className={` absolute left-2 top-[12px] text-[16px] transition-all duration-200 ease-in-out transform pointer-events-none ${isFocused ? " -translate-y-6 translate-x-3 bg-white px-1 text-sm" : ""}`}
          >
            {label}
          </span>
        )}
        {error && (
          <span className="text-[12px] text-red-500">{error.message}</span>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";

export default Input;

