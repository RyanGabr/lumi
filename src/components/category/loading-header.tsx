import { Skeleton } from "../ui/skeleton";

export function LoadingHeader() {
  return (
    <div className="py-4 px-5 flex items-center gap-2">
      <Skeleton className="h-3 rounded w-4"/>
      <Skeleton className="h-3 rounded w-52"/>
    </div>
  );
}
