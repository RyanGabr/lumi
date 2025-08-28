import { TrashIcon } from "@heroicons/react/20/solid";
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
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { useDeleteCategory } from "@/hooks/use-category";
import { useNavigate } from "react-router-dom";

interface DeleteDialogProps {
  category_id: string;
}

export function DeleteDialog({ category_id }: DeleteDialogProps) {
  const { mutateAsync, isPending } = useDeleteCategory();
  const navigate = useNavigate();

  async function handleDeleteCategory() {
    await mutateAsync(category_id);
    setTimeout(() => {
      navigate("/gallery");
    }, 500);
  }

  return (
    <Dialog>
      <DialogTrigger>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size="sm"
              variant="ghost"
              className="has-[>svg]:px-2 h-7 rounded-sm"
            >
              <TrashIcon className="fill-foreground/50 size-4.5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Excluir</TooltipContent>
        </Tooltip>
      </DialogTrigger>
      <DialogContent className="w-sm rounded-xl">
        <DialogHeader className="gap-1 pb-1">
          <DialogTitle className="font-semibold text-base text-center">
            Tem certeza dessa ação?
          </DialogTitle>
          <DialogDescription>
            Todas as imagens dessa categoria serão excluídas.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:flex-col gap-2">
          <Button
            onClick={handleDeleteCategory}
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
