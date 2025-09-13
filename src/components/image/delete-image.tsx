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
import { useDeleteImage } from "@/hooks/use-delete-image";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useImage } from "./image";

export function DeleteImage() {
  const { id, path } = useImage();

  const [dialogIsOpen, setDialogIsOpen] = useState(false);
  const { mutateAsync, isPending } = useDeleteImage();

  async function handleDeleteImage() {
    await mutateAsync({
      id: id,
      path: [path],
    });

    setDialogIsOpen(false);
    
    /*
      I'm using this code snippet to fix an error that occurs when closing a Dialog. After closing, 
      the pointer-events: none; style was being retained in the body, resulting in no mouse events being captured on 
      the entire page.
    */
    setTimeout(() => {
      document.body.style.pointerEvents = "auto";
    }, 0);

    toast.info("Imagem removida", {
      description: "Para recuperar a imagem, basta entrar na lixeira.",
      duration: 4000,
    });
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
      <DialogContent
        className="w-sm rounded-xl"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
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
