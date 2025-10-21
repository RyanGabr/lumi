import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface SidebarRootProps {
  children: ReactNode;
  className?: string;
}

export function SidebarRoot({ children, className }: SidebarRootProps) {
  return (
    <div className={cn("h-full min-w-64 max-w-64 space-y-5 p-2 overflow-auto cursor-default select-none bg-foreground/3 dark:bg-foreground/2 border-r-[1.5px] border-border/50", className)}>
      {children}
    </div>
  );
}
