import { Star } from "lucide-react";
import { ContextMenuItem } from "../ui/context-menu";
import { useFavoriteImage } from "@/hooks/use-images";
import type { ImageType } from "@/types/image";

interface FavoriteImageProps {
  image: ImageType;
}

export function FavoriteImage({ image }: FavoriteImageProps) {
  const { mutateAsync, isPending } = useFavoriteImage();

  const isFavorite = image.is_favorite;

  const handleClick = async () => {
    await mutateAsync({ id: image.id, is_favorite: !isFavorite });
  };

  const label = image.is_favorite
    ? "Remover dos favoritos"
    : "Adicionar aos favoritos";

  const className = image.is_favorite
    ? "focus:text-red-400 focus:[&_svg:not([class*='text-'])]:text-red-400"
    : "focus:text-yellow-400 focus:[&_svg:not([class*='text-'])]:text-yellow-400";

  return (
    <ContextMenuItem
      onClick={handleClick}
      disabled={isPending}
      className={className}
    >
      <Star />
      {label}
    </ContextMenuItem>
  );
}
