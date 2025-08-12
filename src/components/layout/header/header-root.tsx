import type { ReactNode } from "react";

interface HeaderRootProps {
  children: ReactNode;
}

export function HeaderRoot({ children }: HeaderRootProps) {
  return <div className="flex items-center justify-between">{children}</div>;
}
