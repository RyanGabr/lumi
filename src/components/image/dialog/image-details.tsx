import { DialogContent } from "../../ui/dialog";
import { Options } from "./options";
import { useImage } from "../image";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";

export function ImageDetails() {
  const { image_url } = useImage();

  return (
    <DialogContent className="w-full h-[97%] items-start flex flex-col p-0 gap-0">
      <TransformWrapper
        initialScale={.9}
        minScale={.9}
        maxScale={5}
        wheel={{ step: 0.2 }}
        doubleClick={{ mode: "zoomIn" }}
        panning={{ velocityDisabled: true }}
      >
        <Options />
        <div className="flex-1 flex items-center justify-center overflow-hidden w-full cursor-grab">
          <TransformComponent>
            <img
              src={image_url}
              alt="current image view"
              className="max-w-full max-h-full object-contain"
            />
          </TransformComponent>
        </div>
      </TransformWrapper>
    </DialogContent>
  );
}
