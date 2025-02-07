import { cn } from "@/lib/utils";
import React from "react";
import Spinner from "./Spinner";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  loading?: boolean;
  className?: string;
  spanClassName?: string;
}

export default function Button({
  label,
  className,
  spanClassName,
  loading,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "w-full h-12 text-[18px] relative group overflow-hidden border-2 border-black hover:text-white",
        className,
      )}
      disabled={loading}
      {...props}
    >
      <span
        className={cn(
          `absolute inset-0 bg-black transform -translate-x-[calc(100%+1px)] ${loading ? "translate-x-0" : "group-hover:translate-x-0"} transition-transform duration-700 ease-in-out`,
          spanClassName,
        )}
      ></span>
      {loading ? (
        <div className="w-full h-full flex justify-center items-center">
          <Spinner bg="#494949" />
        </div>
      ) : (
        <span className="relative">{label}</span>
      )}
    </button>
  );
}

