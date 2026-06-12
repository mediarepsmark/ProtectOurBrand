import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Card({
  children,
  className,
  ...props
}: {
  children: ReactNode;
  className?: string;
} & HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("rounded-md border border-slateLine bg-white p-6 shadow-sm", className)} {...props}>
      {children}
    </div>
  );
}
