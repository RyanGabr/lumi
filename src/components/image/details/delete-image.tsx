import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "../../ui/tooltip";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useDeleteImage } from "@/hooks/use-delete-image";
import { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useLocation } from "react-router-dom";
import { useGetImageById } from "@/hooks/use-get-images";

export function DeleteImage() {
  const location = useLocation();
  const imageId = location.search.replace("?", "");

  const {
    data: { id, path },
  } = useGetImageById(imageId);

  const [dialogIsOpen, setDialogIsOpen] = useState(false);
  const { mutateAsync, isPending } = useDeleteImage();

  async function handleDeleteImage() {
    await mutateAsync({
      id: id,
      path: [path],
    });

    setDialogIsOpen(false);

    toast.info("Imagem removida", {
      description: "Sua imagem foi completamente excluída da galeria",
      duration: 4000,
    });
  }

  return (
    <Dialog open={dialogIsOpen} onOpenChange={setDialogIsOpen}>
      <DialogTrigger>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="sm">
              <Trash2 className="size-4.5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Excluir imagem</TooltipContent>
        </Tooltip>
      </DialogTrigger>
      <DialogContent className="w-sm rounded-xl">
        <DialogHeader className="gap-1 pb-1">
          <DialogTitle className="font-semibold text-base text-center">
            Tem certeza dessa ação?
          </DialogTitle>
          <DialogDescription className="text-center">
            A imagem será excluída permanentemente.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:flex-col gap-2">
          <Button
            type="submit"
            onClick={handleDeleteImage}
            variant="destructive"
            className="w-full"
            disabled={isPending}
          >
            Excluir
          </Button>
          <DialogClose>
            <Button variant="outline" className="w-full">
              Cancelar
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
