import { useGetCategoryById } from "@/hooks/use-get-categories";
import { SlashIcon } from "@heroicons/react/20/solid";
import { useLocation } from "react-router-dom";
import { DeleteDialog } from "./delete-category";
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
    <div className="flex flex-col">
      <header className="w-full flex items-center justify-between py-2 px-5">
        {/* Left side */}
        <div className="flex items-center gap-0.5 cursor-default select-none">
          <span className="font-medium text-sm">Categorias</span>
          <SlashIcon className="size-5 fill-foreground/20" />
          <div className="flex items-center gap-2">
            <span className="font-semibold text-sm truncate text-ellipsis">
              {category?.name}
            </span>
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center">
          <span className="font-medium text-sm text-foreground/40 mr-2 select-none hidden lg:block">
            Criada em {created_at_date}
          </span>
          <CreateImage />
          <EditCategory />
          <DeleteDialog />
        </div>
      </header>

      {/* Banner */}
      <div className="relative">
        <div className="h-32 w-full bg-foreground/10" />
        <div className="w-full xl:w-10/12 2xl:w-8/12 mx-auto px-5 md:px-10">
          <div className="size-16 bg-background rounded-full border-2 border-border flex items-center justify-center absolute -bottom-10">
            <div data-color={category.color} className="size-6 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
