import { Skeleton } from "@/components/ui/skeleton";

export function LoadingSidebar() {
  return (
    <div className="h-full w-72 space-y-9 py-3 px-4 bg-foreground/2 border-r border-border/50">
      <div className="flex items-center gap-2">
        <Skeleton className="w-5.5 h-5.5 rounded" />
        <Skeleton className="flex-1 h-3 rounded" />
      </div>
      <div className="flex flex-col gap-4.5">
        {Array.from({ length: 3 }).map((_, index) => (
          <Skeleton key={index} className="w-2/3 rounded h-3" />
        ))}
      </div>
      <div className="flex flex-col gap-4.5">
        <Skeleton className="h-3 rounded w-1/3" />
        {Array.from({ length: 4 }).map((_, index) => (
          <Skeleton key={index} className="w-2/3 rounded h-3" />
        ))}
      </div>
      <div className="flex flex-col gap-4">
        <Skeleton className="h-3 rounded w-1/3" />
        <div className="flex flex-col gap-4.5">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="flex items-center gap-2">
              <Skeleton className="w-4 h-4 rounded" />
              <Skeleton className="w-2/3 h-3 rounded" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
