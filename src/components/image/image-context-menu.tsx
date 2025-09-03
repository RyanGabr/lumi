import {
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuSeparator,
} from "../ui/context-menu";
import type { ImageType } from "@/types/image";
import { DeleteImage } from "./delete-image";
import { useFavoriteImage } from "@/hooks/use-images";
import { ArrowUpRight, Download, Grid2x2Plus, Star, Text } from "lucide-react";

interface ImageContextMenuProps {
  image: ImageType;
}

export function ImageContextMenu({ image }: ImageContextMenuProps) {
  const { mutateAsync, isPending } = useFavoriteImage();

  function formatDate(isoString: string) {
    const date = new Date(isoString);

    const day = String(date.getUTCDate()).padStart(2, "0");
    const month = String(date.getUTCMonth() + 1).padStart(2, "0");
    const year = date.getUTCFullYear();

    return `${day}/${month}/${year}`;
  }

  async function favoriteImage() {
    await mutateAsync({ id: image.id, is_favorite: true });
  }

  async function removeFavorite() {
    await mutateAsync({ id: image.id, is_favorite: false });
  }

  return (
    <ContextMenuContent className="w-56">
      <ContextMenuLabel>Imagem</ContextMenuLabel>
      <ContextMenuItem>
        <ArrowUpRight />
        Abrir
      </ContextMenuItem>
      <ContextMenuItem>
        <Grid2x2Plus />
        Categoria
      </ContextMenuItem>
      {image.is_favorite === false ? (
        <ContextMenuItem
          onClick={favoriteImage}
          disabled={isPending}
          className="focus:text-yellow-400 focus:[&_svg:not([class*='text-'])]:text-yellow-400"
        >
          <Star />
          Adicionar aos favoritos
        </ContextMenuItem>
      ) : (
        <ContextMenuItem
          onClick={removeFavorite}
          disabled={isPending}
          className="focus:text-red-400 focus:[&_svg:not([class*='text-'])]:text-red-400"
        >
          <Star />
          Remover dos favoritos
        </ContextMenuItem>
      )}
      <ContextMenuItem>
        <Text />
        Adicionar descrição
      </ContextMenuItem>
      <ContextMenuItem>
        <Download />
        Fazer download
      </ContextMenuItem>
      <ContextMenuSeparator className="mx-2" />
      <DeleteImage image={image} />
      <ContextMenuSeparator className="mx-2" />
      <p className="text-xs text-foreground/40 font-medium px-2 py-1 select-none">
        Imagem inserida em {formatDate(image.created_at)}
      </p>
    </ContextMenuContent>
  );
}
