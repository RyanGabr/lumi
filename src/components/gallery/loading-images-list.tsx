import { Skeleton } from "../ui/skeleton";

export function LoadingImagesList() {
  return (
    <div className="flex flex-col gap-4">
      <Skeleton className="h-3 rounded w-1/8" />
      <Skeleton className="h-5 rounded w-full" />
      <Skeleton className="h-5 rounded w-1/2" />
      <Skeleton className="h-5 rounded w-1/3" />
    </div>
  );
}
