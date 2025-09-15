import { ContextMenuContent, ContextMenuSeparator } from "../ui/context-menu";
import { TrashImage } from "./trash-image";
import { FavoriteImage } from "./favorite-image";
import { SelectCategory } from "./select-category";
import { ImageDescription } from "./image-description";
import { DownloadImage } from "./download-image";
import { useImage } from "./image";
import { RecoverImage } from "./recover-image";
import { DeleteImage } from "./delete-image";

export function ImageContextMenu() {
  const { is_deleted } = useImage();

  return (
    <ContextMenuContent className="w-56">
      {is_deleted === false ? (
        <>
          <FavoriteImage />
          <SelectCategory />
          <ImageDescription />
          <DownloadImage />
          <ContextMenuSeparator className="mx-2" />
          <TrashImage />
        </>
      ) : (
        <>
          <RecoverImage />
          <DeleteImage />
        </>
      )}
    </ContextMenuContent>
  );
}
