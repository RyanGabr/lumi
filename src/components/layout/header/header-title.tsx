import type { ReactNode } from "react";

interface HeaderTitleProps {
  children: ReactNode;
}

export function HeaderTitle({ children }: HeaderTitleProps) {
  return (
    <h1
      className="font-semibold text-2xl truncate text-ellipsis
      select-none"
    >
      {children}
    </h1>
  );
}
