import {
  ContextMenuContent,
  ContextMenuSeparator,
} from "../../ui/context-menu";
import { FavoriteImage } from "./favorite-image";
import { DownloadImage } from "./download-image";
import { useImage } from "../image";
import { DeleteImage } from "./delete-image";
import { SelectCollection } from "./select-collection";
import { TrashImage } from "./trash-image";
import { RecoverImage } from "./recover-image";

export function ImageContextMenu() {
  const { is_deleted } = useImage();

  return (
    <ContextMenuContent className="w-56">
      {is_deleted === false ? (
        <>
          <FavoriteImage />
          <SelectCollection />
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
