import { Squares2X2Icon } from "@heroicons/react/16/solid";
import { CategoryCard } from "./category-card";

const categoies = [
  { category_name: "Kubo | Gerenciamento de estoque", image_quantity: 8 },
  { category_name: "Ideias de interface", image_quantity: 20 },
  { category_name: "Importante", image_quantity: 4 },
];

export function CategoriesList() {
  return (
    <div className="space-y-4 select-none">
      <span className="flex items-center gap-1.5 text-xs font-bold text-foreground/50">
        <Squares2X2Icon className="size-3.5" />
        Categorias
      </span>
      <div className="grid grid-cols-5 gap-5 items-center">
        {categoies.map((item, index) => (
          <CategoryCard
            key={index}
            category_name={item.category_name}
            image_quantity={item.image_quantity}
          />
        ))}
      </div>
    </div>
  );
}
