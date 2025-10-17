import { cn } from "@/lib/utils";
import type { ComponentProps, ReactNode } from "react";
import { forwardRef } from "react";

interface SidebarButtonProps extends ComponentProps<"button"> {
  children: ReactNode;
  className?: string;
}

export const SidebarButton = forwardRef<HTMLButtonElement, SidebarButtonProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <button
        ref={ref}
        type="button"
        {...props}
        className={cn(
          "w-full flex items-center gap-2 font-medium text-sm text-foreground/70 px-3 py-1.5 rounded-sm hover:bg-foreground/6 transition-colors cursor-pointer",
          className
        )}
      >
        {children}
      </button>
    );
  }
);

SidebarButton.displayName = "SidebarButton";
