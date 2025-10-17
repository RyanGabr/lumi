import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "../../ui/tooltip";
import { Undo2 } from "lucide-react";
import { toast } from "sonner";
import { useUpdateImage } from "@/hooks/use-update-image";

export function RecoverImage() {
  const imageId = location.search.replace("?", "");

  const { mutateAsync } = useUpdateImage();

  async function recoverImage() {
    await mutateAsync({ id: imageId, data: { is_deleted: false } });

    toast.info("Imagem recuperada", {
      description: "Sua imagem está de volta à galeria",
      duration: 4000,
    });
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button onClick={recoverImage} variant="ghost" size="sm">
          <Undo2 className="size-4.5" />
        </Button>
      </TooltipTrigger>
      <TooltipContent>Recuperar imagem</TooltipContent>
    </Tooltip>
  );
}
