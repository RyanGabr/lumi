import type { ReactNode } from "react";

interface HeaderTitleProps {
  children: ReactNode;
}

export function HeaderTitle({ children }: HeaderTitleProps) {
  return <h1 className="font-medium text-2xl truncate text-ellipsis">{children}</h1>;
}
