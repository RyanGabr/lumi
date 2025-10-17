import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Star } from "lucide-react";
import { useUpdateImage } from "@/hooks/use-update-image";
import { useLocation } from "react-router-dom";
import { useGetImageById } from "@/hooks/use-get-images";

export function FavoriteImage() {
  const location = useLocation();
  const imageId = location.search.replace("?", "");

  const {
    data: { id, is_favorite },
  } = useGetImageById(imageId);
  
  const { mutateAsync } = useUpdateImage();

  const isFavorite = is_favorite;

  const handleClick = async () => {
    await mutateAsync({ id: id, data: { is_favorite: !isFavorite } });
  };

  const label = is_favorite
    ? "Remover dos favoritos"
    : "Adicionar aos favoritos";

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button onClick={handleClick} type="button" variant="ghost" size="sm">
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
