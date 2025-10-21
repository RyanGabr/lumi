import { useGetImages } from "@/hooks/use-get-images";
import { CreateImage } from "./create-image";
import { Image } from "../image/image";
import { ImagesIcon } from "lucide-react";

export function ImagesList() {
  const { data: images } = useGetImages();

  const Header = () => (
    <span className="flex items-center gap-2 text-xs font-semibold text-foreground/50">
      <ImagesIcon className="size-3.5" />
      Suas imagens
    </span>
  );

  if (!images || images.length === 0) {
    return (
      <div className="space-y-4 select-none">
        <Header />
        <CreateImage />
      </div>
    );
  }

  return (
    <div className="space-y-4 select-none">
      <Header />
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 items-start">
        {images.map((image) => (
          <Image image={image} key={image.id} />
        ))}
      </div>
    </div>
  );
}
