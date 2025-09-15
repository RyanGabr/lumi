import { useEmptyTrash } from "@/hooks/use-delete-image";
import { Button } from "../ui/button";
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
import { useState } from "react";
import { BrushCleaning } from "lucide-react";

export function EmptyTrash() {
  const { mutateAsync, isPending } = useEmptyTrash();
  const [dialogIsOpen, setDialogIsOpen] = useState(false);

  async function emptyTrash() {
    await mutateAsync();
    setDialogIsOpen(false);
  }

  return (
    <Dialog open={dialogIsOpen} onOpenChange={setDialogIsOpen}>
      <DialogTrigger asChild>
        <Button
          size="sm"
          variant="ghost"
          className="has-[>svg]:px-2 h-7 rounded-sm"
        >
          <BrushCleaning />
          Esvaziar lixeira
        </Button>
      </DialogTrigger>

      <DialogContent className="w-sm rounded-xl">
        <DialogHeader className="gap-1 pb-1">
          <DialogTitle className="font-semibold text-base text-center">
            Tem certeza dessa ação?
          </DialogTitle>
          <DialogDescription className="text-center">
            Todas as imagens da lixeira serão excluídas.
          </DialogDescription>
        </DialogHeader>
        
        <DialogFooter className="sm:flex-col gap-2">
          <Button
            onClick={emptyTrash}
            variant="destructive"
            className="w-full"
            disabled={isPending}
          >
            Esvaziar lixeira
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
