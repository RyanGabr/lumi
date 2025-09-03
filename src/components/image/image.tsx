import { Star } from "lucide-react";
import { ContextMenu, ContextMenuTrigger } from "../ui/context-menu";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import type { ImageType } from "@/types/image";
import { ImageContextMenu } from "./image-context-menu";

interface ImageProps {
  image: ImageType;
}

export function Image({ image }: ImageProps) {
  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <div className="relative h-72">
          {image.is_favorite === true && (
            <Tooltip>
              <TooltipTrigger className="absolute right-4 top-4 w-fit h-fit z-50">
                <Star className="size-5 fill-yellow-400 text-transparent" />
              </TooltipTrigger>
              <TooltipContent>Imagem favoritada</TooltipContent>
            </Tooltip>
          )}
          <img
            key={image.id}
            src={image.image_url}
            className="w-full h-72 rounded-xl object-cover transition-all hover:brightness-110 border-2 border-border/50 cursor-pointer"
          />
        </div>
      </ContextMenuTrigger>
      <ImageContextMenu image={image} />
    </ContextMenu>
  );
}
