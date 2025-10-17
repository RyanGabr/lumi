import { useGetTrashedImages } from "@/hooks/use-get-images";
import { Image } from "../image/image";
import { ImageOff, Loader2 } from "lucide-react";

export function ImagesList() {
  const { data: trashedImages, isFetching } = useGetTrashedImages();

  if (isFetching) {
    return (
      <div className="w-full h-96 flex items-center justify-center">
        <Loader2 className="animate-spin text-foreground/50" />
      </div>
    );
  }

  if (!trashedImages || trashedImages.length === 0) {
    return (
      <div className="select-none w-full h-96 flex flex-col gap-2 items-center justify-center">
        <ImageOff className="size-10 text-ring mb-2" />
        <h3 className="font-semibold text-sm">Sem imagens por aqui!</h3>
        <p className="text-sm text-foreground/50">
          Você ainda não possui nenhuma imagem na lixeira
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4 select-none">
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-5 items-start">
        {trashedImages.map((image) => (
          <Image image={image} key={image.id} />
        ))}
      </div>
    </div>
  );
}
