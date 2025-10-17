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
import { useDeleteCollection } from "@/hooks/use-delete-collection";
import { useLocation, useNavigate } from "react-router-dom";
import { Trash2Icon } from "lucide-react";

export function DeleteCollection() {
  const location = useLocation();
  const collectionId = location.search.replace("?", "");

  const { mutateAsync, isPending } = useDeleteCollection();
  const navigate = useNavigate();

  async function handleDeleteCollection() {
    await mutateAsync(collectionId);
    setTimeout(() => {
      navigate("/home");
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
              <Trash2Icon className="size-4.5" />
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
            Todas as imagens dessa coleção serão excluídas.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:flex-col gap-2">
          <Button
            onClick={handleDeleteCollection}
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
