import { useGetCategoryById } from "@/hooks/use-get-categories";
import { Squares2X2Icon } from "@heroicons/react/16/solid";
import { SlashIcon } from "@heroicons/react/20/solid";
import { useLocation } from "react-router-dom";
import { DeleteDialog } from "./delete-dialog";
import { CreateImage } from "./create-image";
import { EditCategory } from "./edit-category";

export function Header() {
  const location = useLocation();
  const categoryId = location.search.replace("?", "");

  const { data: category } = useGetCategoryById(categoryId);

  const date = new Date(category.created_at);

  const created_at_date = Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(date);

  return (
    <div className="w-full flex items-center justify-between py-2 px-5">
      <div className="flex items-center gap-0.5 cursor-default select-none">
        <div className="flex items-center gap-1.5">
          <Squares2X2Icon className="size-4 fill-foreground/50" />
          <span className="font-medium text-sm">Categorias</span>
        </div>
        <SlashIcon className="size-5 fill-foreground/20" />
        <div className="flex items-center gap-2">
          <div data-color={category?.color} className="size-2 rounded-full" />
          <span className="font-medium text-sm">{category?.name}</span>
        </div>
      </div>
      <div className="flex items-center">
        <span className="font-medium text-sm text-foreground/40 mr-2 select-none">
          Criada em {created_at_date}
        </span>
        <CreateImage />
        <EditCategory />
        <DeleteDialog />
      </div>
    </div>
  );
}
