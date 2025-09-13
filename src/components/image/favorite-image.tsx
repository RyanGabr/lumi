import { Star } from "lucide-react";
import { ContextMenuItem } from "../ui/context-menu";
import { useFavoriteImage } from "@/hooks/use-update-image";
import { useImage } from "./image";

export function FavoriteImage() {
  const { is_favorite, id } = useImage();
  const { mutateAsync, isPending } = useFavoriteImage();

  const isFavorite = is_favorite;

  const handleClick = async () => {
    await mutateAsync({ id: id, is_favorite: !isFavorite });
  };

  const label = is_favorite
    ? "Remover dos favoritos"
    : "Adicionar aos favoritos";

  const className = is_favorite
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
