import { useGetFavoriteImages } from "@/hooks/use-images";
import { StarIcon } from "@heroicons/react/16/solid";
import { Loader2, StarOff } from "lucide-react";
import { Image } from "../image/image";

export function ImagesList() {
  const { data: images, isFetching } = useGetFavoriteImages();

  const Header = () => (
    <span className="flex items-center gap-1.5 text-xs font-bold text-foreground/50">
      <StarIcon className="size-3.5" />
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
        <StarOff className="size-10 text-ring mb-2" />
        <h3 className="font-semibold">Sem imagens por aqui!</h3>
        <p className="text-sm text-foreground/50">
          Adicione uma imagem como favorito.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4 select-none">
      <Header />
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-5 items-start">
        {images.map((image) => (
          <Image image={image} key={image.id}/>
        ))}
      </div>
    </div>
  );
}
