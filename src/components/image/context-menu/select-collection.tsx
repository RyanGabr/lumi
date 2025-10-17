import { Check, Grid2x2Plus } from "lucide-react";
import {
  ContextMenuItem,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
} from "@/components/ui/context-menu";
import { useGetCollection } from "@/hooks/use-get-collection";
import { useUpdateImageCollection } from "@/hooks/use-update-image";
import { useImage } from "../image";
import { toast } from "sonner";

export function SelectCollection() {
  const { category_id, id } = useImage();

  const { data: collections } = useGetCollection();
  const { mutateAsync, isPending } = useUpdateImageCollection();

  const currentCollection = category_id;

  async function updateImageCollection(
    category_id: string,
    collection_name: string
  ) {
    await mutateAsync({
      id: id,
      category_id: category_id,
    });

    toast.info("Categoria selecionada", {
      description: `Sua imagem agora pertence à coleção ${collection_name}`,
      duration: 4000,
    });
  }

  return (
    <ContextMenuSub>
      <ContextMenuSubTrigger className="gap-2">
        <Grid2x2Plus />
        Coleção
      </ContextMenuSubTrigger>
      <ContextMenuSubContent className="w-52">
        {collections.length <= 0 ? (
          <div className="p-1.5">
            <p className="text-sm font-medium select-none text-foreground/70">
              Você ainda não adicionou nenhuma coleção.
            </p>
          </div>
        ) : (
          collections.map((collection) => (
            <ContextMenuItem
              onClick={() =>
                updateImageCollection(collection.id, collection.name)
              }
              className="justify-between"
              disabled={isPending}
            >
              <div className="flex items-center gap-2">
                <div
                  data-color={collection.color}
                  className="min-w-2 min-h-2 rounded-full"
                />
                <span className="line-clamp-1">{collection.name}</span>
              </div>
              {collection.id === currentCollection && <Check />}
            </ContextMenuItem>
          ))
        )}
      </ContextMenuSubContent>
    </ContextMenuSub>
  );
}
