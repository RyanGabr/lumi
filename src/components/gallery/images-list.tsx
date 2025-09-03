import { useGetImages } from "@/hooks/use-images";
import { PhotoIcon } from "@heroicons/react/16/solid";
import { ContextMenu, ContextMenuTrigger } from "../ui/context-menu";
import { ImageContextMenu } from "./image-context-menu";
import { CreateImage } from "./create-image";

export function ImagesList() {
  const { data: images } = useGetImages();

  const Header = () => (
    <span className="flex items-center gap-1.5 text-xs font-bold text-foreground/50">
      <PhotoIcon className="size-3.5" />
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
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-5 items-start">
        {images.map((image) => (
          <ContextMenu>
            <ContextMenuTrigger>
              <img
                key={image.id}
                src={image.image_url}
                className="w-full h-72 rounded-xl object-cover transition-all hover:brightness-110 border-2 border-border/50 cursor-pointer"
              />
            </ContextMenuTrigger>
            <ImageContextMenu image={image} />
          </ContextMenu>
        ))}
      </div>
    </div>
  );
}
