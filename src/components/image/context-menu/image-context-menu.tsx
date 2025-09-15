import {
  ContextMenuContent,
  ContextMenuSeparator,
} from "../../ui/context-menu";
import { FavoriteImage } from "./favorite-image";
import { DownloadImage } from "./download-image";
import { useImage } from "../image";
import { DeleteImage } from "./delete-image";
import { SelectCategory } from "./select-category";
import { ImageDescription } from "./image-description";
import { TrashImage } from "./trash-image";
import { RecoverImage } from "./recover-image";

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
