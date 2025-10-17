import { Star } from "lucide-react";
import { ContextMenu, ContextMenuTrigger } from "../ui/context-menu";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import type { ImageType } from "@/types/image";
import { ImageContextMenu } from "./context-menu/image-context-menu";
import { createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";

interface ImageProps {
  image: ImageType;
}

const ImageContext = createContext<ImageType | null>(null);

export function useImage() {
  const context = useContext(ImageContext);
  if (!context) throw new Error("useImage must be used within <Image>");
  return context;
}

export function Image({ image }: ImageProps) {
  const navigate = useNavigate();

  function navigateToImageDetails(){
    navigate(`/details?${image.id}`);
  }

  return (
    <ImageContext.Provider value={image}>
      <ContextMenu>
        <ContextMenuTrigger asChild>
          <button
            onClick={navigateToImageDetails}
            type="button"
            className="relative h-72 cursor-pointer"
          >
            {image.is_favorite && (
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
              className="w-full h-72 rounded-xl object-cover transition-all hover:brightness-85 border-2 border-border/50"
            />
          </button>
        </ContextMenuTrigger>

        {/* Image context menu */}
        <ImageContextMenu />
      </ContextMenu>
    </ImageContext.Provider>
  );
}
