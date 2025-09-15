import { Check, Grid2x2Plus } from "lucide-react";
import {
  ContextMenuItem,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
} from "@/components/ui/context-menu";
import { useGetCategories } from "@/hooks/use-get-categories";
import { useUpdateImageCategory } from "@/hooks/use-update-image";
import { useImage } from "../image";

export function SelectCategory() {
  const { category_id, id } = useImage();

  const { data: categories } = useGetCategories();
  const { mutateAsync, isPending } = useUpdateImageCategory();

  const currentCategory = category_id;

  async function updateImageCategory(category_id: string) {
    await mutateAsync({
      id: id,
      category_id: category_id,
    });
  }

  return (
    <ContextMenuSub>
      <ContextMenuSubTrigger className="gap-2">
        <Grid2x2Plus />
        Categoria
      </ContextMenuSubTrigger>
      <ContextMenuSubContent className="w-52">
        {categories.length <= 0 ? (
          <div className="p-1.5">
            <p className="text-sm font-medium select-none text-foreground/70">
              Você ainda não adicionou nenhuma categoria.
            </p>
          </div>
        ) : (
          categories.map((category) => (
            <ContextMenuItem
              onClick={() => updateImageCategory(category.id)}
              className="justify-between"
              disabled={isPending}
            >
              <div className="flex items-center gap-2">
                <div
                  data-color={category.color}
                  className="size-2 rounded-full"
                />
                {category.name}
              </div>
              {category.id === currentCategory && <Check />}
            </ContextMenuItem>
          ))
        )}
      </ContextMenuSubContent>
    </ContextMenuSub>
  );
}
