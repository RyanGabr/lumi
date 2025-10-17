import { Star } from "lucide-react";
import { ContextMenuItem } from "@/components/ui/context-menu";
import { useUpdateImage } from "@/hooks/use-update-image";
import { useImage } from "../image";
import { toast } from "sonner";

export function FavoriteImage() {
  const { is_favorite, id } = useImage();
  const { mutateAsync, isPending } = useUpdateImage();

  const isFavorite = is_favorite;

  const handleClick = async () => {
    await mutateAsync({ id: id, data: { is_favorite: !isFavorite } });

    if (is_favorite === false) {
      toast.info("Imagem favoritada", {
        description: "Entre em Favoritos para ver sua imagem",
        duration: 4000,
      });
    } else {
      toast.info("Imagem removida dos favoritos", {
        duration: 4000,
      });
    }
  };

  const label = is_favorite
    ? "Remover dos favoritos"
    : "Adicionar aos favoritos";

  const className = is_favorite
    ? "focus:text-red-400 focus:[&_svg:not([class*='text-'])]:text-red-400"
    : "";

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
