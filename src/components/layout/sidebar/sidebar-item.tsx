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
        "flex items-center justify-between font-medium text-sm px-3 py-1.5 rounded-lg hover:bg-foreground/10 transition-colors cursor-default",
        className
      )}
    >
      {children}
    </Link>
  );
}
