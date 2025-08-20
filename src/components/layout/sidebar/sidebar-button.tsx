import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface SidebarButtonProps {
  children: ReactNode;
  className?: string;
}

export function SidebarButton({ children, className }: SidebarButtonProps) {
  return (
    <button
      className={cn(
        "w-full flex items-center gap-2 font-medium text-sm text-foreground/70 px-3 py-1.5 rounded-sm hover:bg-foreground/6 transition-colors cursor-pointer",
        className
      )}
    >
      {children}
    </button>
  );
}
