import { Skeleton } from "../ui/skeleton";

export function LoadingCategoriesList() {
  return (
    <div className="space-y-4 select-none">
      <Skeleton className="w-32 h-3 rounded" />
      <div className="grid grid-cols-5 gap-5 items-center">
        {Array.from({ length: 5 }).map((_, index) => (
          <Skeleton key={index} className="h-44 rounded-3xl w-[1fr]" />
        ))}
      </div>
    </div>
  );
}
