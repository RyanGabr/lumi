import { Skeleton } from "@/components/ui/skeleton";

export function LoadingSidebar() {
  return (
    <div className="h-full w-72 space-y-7 p-5">
      <Skeleton className="w-full rounded-lg h-12" />
      <div className="flex flex-col gap-4.5">
        {Array.from({ length: 2 }).map((_, index) => (
          <Skeleton key={index} className="w-full rounded h-4" />
        ))}
      </div>
      <div className="flex flex-col gap-4">
        <Skeleton className="h-3 rounded w-1/2" />
        <div className="flex flex-col gap-4.5">
          {Array.from({ length: 6 }).map((_, index) => (
            <Skeleton key={index} className="w-full rounded h-4" />
          ))}
        </div>
      </div>
    </div>
  );
}
