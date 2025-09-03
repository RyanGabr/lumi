import { Squares2X2Icon } from "@heroicons/react/20/solid";
import { CategoryCard } from "./category-card";
import { useGetCategories } from "@/hooks/use-category";
import { CreateCategory } from "./create-category";

export function CategoriesList() {
  const { data: categories } = useGetCategories();

  if (!categories || categories.length === 0) {
    return (
      <div className="space-y-4 select-none">
        <span className="flex items-center gap-1.5 text-xs font-bold text-foreground/50">
          <Squares2X2Icon className="size-3.5" />
          Categorias
        </span>
        <div className="bg-foreground/3 w-full h-80 rounded-lg flex flex-col items-center justify-center gap-2">
          <Squares2X2Icon className="size-10 fill-foreground/30" />
          <h3 className="font-medium text-foreground/50 text-sm">
            Você ainda não possui nenhuma categoria
          </h3>
          <CreateCategory />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 select-none">
      <span className="flex items-center gap-1.5 text-xs font-bold text-foreground/50">
        <Squares2X2Icon className="size-3.5" />
        Categorias recentes
      </span>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 items-center">
        {categories?.slice(0, 5).map((category, index) => (
          <CategoryCard
            key={index}
            category={category}
          />
        ))}
      </div>
    </div>
  );
}
