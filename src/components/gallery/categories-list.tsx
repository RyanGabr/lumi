import { Squares2X2Icon } from "@heroicons/react/16/solid";
import { CategoryCard } from "./category-card";
import { useGetCategories } from "@/hooks/use-category";

export function CategoriesList() {
  const { data: categories } = useGetCategories();

  return (
    <div className="space-y-4 select-none">
      <span className="flex items-center gap-1.5 text-xs font-bold text-foreground/50">
        <Squares2X2Icon className="size-3.5" />
        Categorias
      </span>
      <div className="grid grid-cols-5 gap-5 items-center">
        {categories?.map((category, index) => (
          <CategoryCard
            key={index}
            category_name={category.name}
          />
        ))}
      </div>
    </div>
  );
}
