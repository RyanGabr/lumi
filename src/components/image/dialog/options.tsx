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

function ImageIsNotTrashedOptions() {
  return (
    <>
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
      <RecoverImage />
      <DeleteImage />
    </>
  );
}

export function Options() {
  const { is_deleted } = useImage();

  return (
    <DialogHeader className="w-full flex-row items-center justify-between">
      <DialogClose asChild>
        <Button variant="ghost" size="sm">
          <ArrowLeft className="size-4.5" />
        </Button>
      </DialogClose>
      <div className="flex items-center">
        {is_deleted ? <ImageIsTrashedOptions /> : <ImageIsNotTrashedOptions />}
      </div>
    </DialogHeader>
  );
}
