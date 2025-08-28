import { useGetImagesByCategoryId } from "@/hooks/use-images";
import { PhotoIcon } from "@heroicons/react/16/solid";
import { BookmarkSlashIcon } from "@heroicons/react/20/solid";
import { useLocation } from "react-router-dom";

export function ImagesList() {
  const location = useLocation();

  const categoryId = location.search.replace("?", "");
  const { data: images } = useGetImagesByCategoryId(categoryId);

  const Header = () => (
    <span className="flex items-center gap-1.5 text-xs font-bold text-foreground/50">
      <PhotoIcon className="size-3.5" />
      Suas imagens
    </span>
  );

  if (!images || images.length === 0) {
    return (
      <div className="select-none w-full h-96 flex flex-col gap-2 items-center justify-center">
        <BookmarkSlashIcon className="size-10 fill-foreground/20 mb-2"/>
        <h3 className="font-semibold">Sem imagens por aqui!</h3>
        <p className="text-sm text-foreground/50">Adicione uma imagem com esta categoria.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4 select-none">
      <Header />
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-5 items-start">
        {images.map((image) => (
          <img
            key={image.id}
            src={image.image_url}
            alt={image.name}
            className="w-full h-72 rounded-xl object-cover transition-all hover:brightness-110 border-2 border-border/50"
          />
        ))}
      </div>
    </div>
  );
}
