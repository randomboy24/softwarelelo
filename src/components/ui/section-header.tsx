import * as React from "react";
import { cn } from "@/lib/utils";

interface SectionHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
}

export function SectionHeader({ title, description, className, ...props }: SectionHeaderProps) {
  return (
    <div className={cn("flex flex-col space-y-2 mb-8", className)} {...props}>
      <h2 className="text-3xl font-bold tracking-tight text-white">{title}</h2>
      {description && <p className="text-slate-400">{description}</p>}
    </div>
  );
}
