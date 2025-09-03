import { useGetFavoriteImages } from "@/hooks/use-images";
import { StarIcon } from "@heroicons/react/16/solid";
import { Loader2, StarOff } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { ContextMenu, ContextMenuTrigger } from "../ui/context-menu";
import { ImageContextMenu } from "../gallery/image-context-menu";

export function ImagesList() {
  const { data: images, isFetching } = useGetFavoriteImages();

  const Header = () => (
    <span className="flex items-center gap-1.5 text-xs font-bold text-foreground/50">
      <StarIcon className="size-3.5" />
      Suas imagens
    </span>
  );

  if (isFetching) {
    return (
      <div className="w-full h-96 flex items-center justify-center">
        <Loader2 className="animate-spin text-foreground/50" />
      </div>
    );
  }

  if (!images || images.length === 0) {
    return (
      <div className="select-none w-full h-96 flex flex-col gap-2 items-center justify-center">
        <StarOff className="size-10 text-ring mb-2" />
        <h3 className="font-semibold">Sem imagens por aqui!</h3>
        <p className="text-sm text-foreground/50">
          Adicione uma imagem como favorito.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4 select-none">
      <Header />
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-5 items-start">
        {images.map((image) => (
          <ContextMenu>
            <ContextMenuTrigger>
              <div className="relative h-72">
                {image.is_favorite === true && (
                  <Tooltip>
                    <TooltipTrigger className="absolute right-4 top-4 w-fit h-fit z-50">
                      <StarIcon className="size-5 fill-yellow-400" />
                    </TooltipTrigger>
                    <TooltipContent>Imagem favoritada</TooltipContent>
                  </Tooltip>
                )}
                <img
                  key={image.id}
                  src={image.image_url}
                  className="w-full h-full rounded-xl object-cover transition-all hover:brightness-110 border-2 border-border/50 cursor-pointer"
                />
              </div>
            </ContextMenuTrigger>
            <ImageContextMenu image={image} />
          </ContextMenu>
        ))}
      </div>
    </div>
  );
}
