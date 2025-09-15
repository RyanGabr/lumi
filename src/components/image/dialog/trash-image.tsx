import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "../../ui/tooltip";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useImage } from "../image";
import { useUpdateImage } from "@/hooks/use-update-image";

export function TrashImage() {
  const { id } = useImage();
  const { mutateAsync } = useUpdateImage();

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
    <Tooltip>
      <TooltipTrigger asChild>
        <Button onClick={moveImageToTrash} variant="ghost" size="sm">
          <Trash2 className="size-4.5" />
        </Button>
      </TooltipTrigger>
      <TooltipContent>Mover para a lixeira</TooltipContent>
    </Tooltip>
  );
}
