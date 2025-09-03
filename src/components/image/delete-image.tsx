import { ContextMenuItem } from "../ui/context-menu";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { useState } from "react";
import { useDeleteImage } from "@/hooks/use-images";
import type { ImageType } from "@/types/image";
import { Trash2 } from "lucide-react";

interface DeleteImageProps {
  image: ImageType;
}

export function DeleteImage({ image }: DeleteImageProps) {
  const [dialogIsOpen, setDialogIsOpen] = useState(false);
  const { mutateAsync, isPending } = useDeleteImage();

  async function handleDeleteImage() {
    await mutateAsync({
      id: image.id,
      path: [image.path]
    });

    setDialogIsOpen(false);
  }

  return (
    <Dialog open={dialogIsOpen} onOpenChange={setDialogIsOpen}>
      <DialogTrigger asChild>
        <ContextMenuItem
          onClick={(e) => {
            e.preventDefault();
            setDialogIsOpen(true);
          }}
          className="focus:text-red-400 focus:[&_svg:not([class*='text-'])]:text-red-400"
        >
          <Trash2 />
          Excluir
        </ContextMenuItem>
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
