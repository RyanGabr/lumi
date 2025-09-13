import type { CategoryType } from "@/types/category";
import { Link } from "react-router-dom";

interface CategoryCardProps {
  category: CategoryType;
}

export function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link
      to={`/category?${category.id}`}
      className="w-[1fr] h-40 rounded-3xl dark:bg-foreground/5 flex flex-col justify-between transition-all dark:hover:bg-foreground/7 hover:bg-foreground/7 select-none"
    >
      <div className="p-4 bg-foreground/7 rounded-t-3xl">
        <div data-color={category.color} className="size-3 rounded-full" />
      </div>
      <div className="p-5">
        <h3 className="font-semibold text-foreground/50 text-sm leading-5">
          {category.name}
        </h3>
      </div>
    </Link>
  );
}
