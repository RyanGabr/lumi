import * as React from "react";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const inputVariants = cva(
  "px-2 py-1.5 rounded-md text-sm w-full focus:outline-none focus:ring ring-ring border border-border/40",
  {
    variants: {
      variant: {
        default: "bg-foreground/5",
        blank: "p-0 border-none focus:ring-none ring-ring/0 rounded-none"
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof inputVariants> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant, ...props }, ref) => {
    return (
      <input
        className={cn(inputVariants({ variant }), className)}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input, inputVariants };
