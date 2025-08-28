import { useGetCategoryById } from "@/hooks/use-category";
import { useLocation } from "react-router-dom";

export function Overview() {
  const location = useLocation();

  const categoryId = location.search.replace("?", "");
  const { data: category } = useGetCategoryById(categoryId);

  return (
    <div className="space-y-2">
      <h1 className="font-bold text-4xl tracking-tight text-foreground/90">
        {category?.name}
      </h1>
      {category.description && (
        <p className="text-sm font-medium text-foreground/50">
          {category.description}
        </p>
      )}
    </div>
  );
}
