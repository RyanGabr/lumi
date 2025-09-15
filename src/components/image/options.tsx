import { ArrowLeft, Download, Star, Text, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { DialogClose, DialogHeader } from "../ui/dialog";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { useImage } from "./image";

export function Options() {
  const { is_favorite } = useImage();

  return (
    <DialogHeader className="w-full flex-row items-center justify-between">
      <DialogClose asChild>
        <Button variant="ghost" size="sm">
          <ArrowLeft className="size-4.5" />
        </Button>
      </DialogClose>
      <div className="flex items-center">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="sm">
              <Download className="size-4.5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Baixar imagem</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="sm">
              <Text className="size-4.5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Descrição da imagem</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="sm">
              <Star
                data-favorite={is_favorite}
                className="size-4.5 data-[favorite=true]:text-yellow-400 data-[favorite=true]:fill-yellow-400"
              />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Marcar imagem como favorito</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="sm">
              <Trash2 className="size-4.5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Excluir imagem</TooltipContent>
        </Tooltip>
      </div>
    </DialogHeader>
  );
}
