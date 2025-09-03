import { cn } from "@/lib/utils";
import type { ReactNode } from "react";
import { Link } from "react-router-dom";

interface SidebarItemProps {
  children: ReactNode;
  href: string;
  className?: string;
}

export function SidebarItem({ children, href, className }: SidebarItemProps) {
  return (
    <Link
      to={href}
      className={cn(
        "flex items-center gap-2 font-semibold text-sm text-foreground/60 px-3 py-1.5 rounded-sm hover:bg-foreground/6 transition-colors cursor-pointer",
        className
      )}
    >
      {children}
    </Link>
  );
}
