import { Button } from "@/components/ui/button";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { Star } from "lucide-react";
import { useImage } from "../image";
import { useFavoriteImage } from "@/hooks/use-update-image";

export function FavoriteImage() {
  const { is_favorite, id } = useImage();
  const { mutateAsync } = useFavoriteImage();

  const isFavorite = is_favorite;

  const handleClick = async () => {
    await mutateAsync({ id: id, is_favorite: !isFavorite });
  };

  const label = is_favorite
    ? "Remover dos favoritos"
    : "Adicionar aos favoritos";

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button onClick={handleClick} variant="ghost" size="sm">
          <Star
            data-favorite={is_favorite}
            className="size-4.5 data-[favorite=true]:text-yellow-400 data-[favorite=true]:fill-yellow-400"
          />
        </Button>
      </TooltipTrigger>
      <TooltipContent>{label}</TooltipContent>
    </Tooltip>
  );
}
