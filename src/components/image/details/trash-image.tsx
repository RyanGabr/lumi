import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "../../ui/tooltip";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useUpdateImage } from "@/hooks/use-update-image";
import { useNavigate } from "react-router-dom";

export function TrashImage() {
  const navigate = useNavigate();
  const imageId = location.search.replace("?", "");
  
  const { mutateAsync } = useUpdateImage();

  async function moveImageToTrash() {
    await mutateAsync({
      id: imageId,
      data: { is_deleted: true, category_id: null, is_favorite: false },
    });

    navigate(-1);

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
