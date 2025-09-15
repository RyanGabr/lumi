import { DialogContent } from "../../ui/dialog";
import { Options } from "./options";
import { useImage } from "../image";

export function ImageDetails() {
  const { image_url } = useImage();

  return (
    <DialogContent className="w-full h-[97%] items-start p-2 m-0 flex flex-col">
      <Options />
      <div className="flex-1 flex items-center justify-center overflow-hidden w-full">
        <img
          src={image_url}
          alt="current image view"
          className="max-w-full max-h-full object-contain rounded-md"
        />
      </div>
    </DialogContent>
  );
}
