import { useGetImagesByCategoryId } from "@/hooks/use-get-images";
import { PhotoIcon } from "@heroicons/react/16/solid";
import { ImageOff, Loader2 } from "lucide-react";
import { useLocation } from "react-router-dom";
import { Image } from "../image/image";

export function ImagesList() {
  const location = useLocation();
  const categoryId = location.search.replace("?", "");

  const { data: images, isFetching } = useGetImagesByCategoryId(categoryId);

  const Header = () => (
    <span className="flex items-center gap-1.5 text-xs font-bold text-foreground/50">
      <PhotoIcon className="size-3.5" />
      Suas imagens
    </span>
  );

  if (isFetching) {
    return (
      <div className="w-full h-96 flex items-center justify-center">
        <Loader2 className="animate-spin text-foreground/50" />
      </div>
    );
  }

  if (!images || images.length === 0) {
    return (
      <div className="select-none w-full h-96 flex flex-col gap-2 items-center justify-center">
        <ImageOff className="size-10 text-ring mb-2" />
        <h3 className="font-semibold">Sem imagens por aqui!</h3>
        <p className="text-sm text-foreground/50">
          Adicione uma imagem com esta categoria.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4 select-none">
      <Header />
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-5 items-start">
        {images.map((image) => (
          <Image image={image} key={image.id} />
        ))}
      </div>
    </div>
  );
}
