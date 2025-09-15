import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useUpdateImage } from "@/hooks/use-update-image";
import { useImage } from "../image";
import { ContextMenuItem } from "@/components/ui/context-menu";

export function TrashImage() {
  const { id } = useImage();
  const { mutateAsync, isPending } = useUpdateImage();

  async function moveImageToTrash() {
    await mutateAsync({
      id: id,
      data: { is_deleted: true, category_id: null, is_favorite: false },
    });

    toast.info("Imagem movida para lixeira", {
      description: "Para recuperar sua imagem, basta entrar na sua lixeira",
    });
  }

  return (
    <ContextMenuItem
      onClick={moveImageToTrash}
      disabled={isPending}
      className="focus:text-red-400 focus:[&_svg:not([class*='text-'])]:text-red-400"
    >
      <Trash2 />
      Mover para a lixeira
    </ContextMenuItem>
  );
}
