import { Options } from "@/components/image/details/options";
import { useGetImageById } from "@/hooks/use-get-images";
import { useLocation } from "react-router-dom";

export function ImageDetails() {
  const location = useLocation();
  const imageId = location.search.replace("?", "");

  const {
    data: { image_url },
  } = useGetImageById(imageId);

  return (
    <div className="w-full h-screen flex flex-col">
      <Options />
      <div className="flex-1 flex items-center justify-center w-full bg-background">
        <img
          src={image_url}
          alt="current image view"
          className="max-w-full max-h-[calc(100vh-64px)] select-none object-contain"
        />
      </div>
    </div>
  );
}
