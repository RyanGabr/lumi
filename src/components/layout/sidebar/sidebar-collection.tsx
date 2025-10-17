import { cn } from "@/lib/utils";
import type { ReactNode } from "react";
import { Link } from "react-router-dom";

interface SidebarCollectionProps {
  children: ReactNode;
  href: string;
  className?: string;
}

export function SidebarCollection({
  children,
  href,
  className,
}: SidebarCollectionProps) {
  return (
    <Link
      to={href}
      className={cn(
        (className =
          "flex items-center justify-between cursor-pointer text-foreground/60 text-sm font-medium hover:text-foreground transition-colors"),
        className
      )}
    >
      {children}
    </Link>
  );
}
