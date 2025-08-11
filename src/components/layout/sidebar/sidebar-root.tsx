import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface SidebarRootProps {
  children: ReactNode;
  className?: string;
}

export function SidebarRoot({ children, className }: SidebarRootProps) {
  return (
    <div className={cn("h-full w-72 space-y-5 p-5", className)}>
      {children}
    </div>
  );
}
