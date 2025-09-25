import { ArrowLeft, Text } from "lucide-react";
import { Button } from "../../ui/button";
import { DialogClose, DialogHeader } from "../../ui/dialog";
import { Tooltip, TooltipContent, TooltipTrigger } from "../../ui/tooltip";
import { useImage } from "../image";
import { DownloadImage } from "./download-image";
import { FavoriteImage } from "./favorite-image";
import { TrashImage } from "./trash-image";
import { RecoverImage } from "./recover-image";
import { DeleteImage } from "./delete-image";
import { ZoomIn } from "./zoom-in";
import { ZoomOut } from "./zoom-out";
import { parseISO, format } from "date-fns";
import { ptBR } from "date-fns/locale";

function ImageIsNotTrashedOptions() {
  return (
    <>
      <ZoomIn />
      <ZoomOut />
      <DownloadImage />
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="ghost" size="sm">
            <Text className="size-4.5" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>Descrição da imagem</TooltipContent>
      </Tooltip>
      <FavoriteImage />
      <TrashImage />
    </>
  );
}

function ImageIsTrashedOptions() {
  return (
    <>
      <ZoomIn />
      <ZoomOut />
      <RecoverImage />
      <DeleteImage />
    </>
  );
}

export function Options() {
  const { is_deleted, created_at } = useImage();
  
  const date = parseISO(created_at);

  const formatted = format(date, "d 'de' MMMM 'de' yyyy 'às' HH:mm", {
    locale: ptBR,
  });

  return (
    <DialogHeader className="relative w-full flex-row items-center justify-between border-b-2 px-3 py-2 bg-foreground/3">
      <DialogClose asChild>
        <Button variant="ghost" size="sm">
          <ArrowLeft className="size-4.5" />
        </Button>
      </DialogClose>
      <div className="absolute left-1/2 transform -translate-x-1/2">
        <span className="font-medium text-sm">{formatted}</span>
      </div>
      <div className="flex items-center">
        {is_deleted ? <ImageIsTrashedOptions /> : <ImageIsNotTrashedOptions />}
      </div>
    </DialogHeader>
  );
}
