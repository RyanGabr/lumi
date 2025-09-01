import {
    ArrowUpRightIcon,
    Bars3BottomLeftIcon,
    StarIcon
} from "@heroicons/react/16/solid";
import {
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuLabel,
    ContextMenuSeparator,
} from "../ui/context-menu";
import type { ImageType } from "@/types/image";
import { DeleteImage } from "./delete-image";

interface ImageContextMenuProps {
  image: ImageType;
}

export function ImageContextMenu({ image }: ImageContextMenuProps) {
  const formatDate = (isoString: string) => {
    const date = new Date(isoString);

    const day = String(date.getUTCDate()).padStart(2, "0");
    const month = String(date.getUTCMonth() + 1).padStart(2, "0");
    const year = date.getUTCFullYear();

    return `${day}/${month}/${year}`;
  };

  return (
    <ContextMenuContent className="w-56">
      <ContextMenuLabel>Imagem</ContextMenuLabel>
      <ContextMenuItem>
        <ArrowUpRightIcon />
        Abrir
      </ContextMenuItem>
      <ContextMenuItem>
        <StarIcon />
        Adicionar aos favoritos
      </ContextMenuItem>
      <ContextMenuItem>
        <Bars3BottomLeftIcon />
        Adicionar descrição
      </ContextMenuItem>
      <ContextMenuSeparator className="mx-2" />
      <DeleteImage image={image}/>
      <ContextMenuSeparator className="mx-2" />
      <p className="text-xs text-foreground/40 font-medium px-2 py-1 select-none">
        Imagem inserida em {formatDate(image.created_at)}
      </p>
    </ContextMenuContent>
  );
}
