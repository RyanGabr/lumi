import { useDialog } from "@/context/dialog-context";
import { useGetImages } from "@/hooks/use-images";
import { PhotoIcon, PlusIcon } from "@heroicons/react/16/solid";

export function ImagesList() {
  const { openDialog } = useDialog();
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
        <button
          onClick={openDialog}
          className="size-52 bg-foreground/5 rounded-xl flex flex-col items-center justify-center gap-2 transition-all hover:bg-foreground/8"
        >
          <PlusIcon className="size-10 fill-foreground/50" />
          <p className="font-medium text-sm text-foreground/50">
            Adicionar imagem
          </p>
        </button>
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
            className="w-full h-96 rounded-xl object-cover transition-all hover:brightness-110 border-2 border-border/50"
          />
        ))}
      </div>
    </div>
  );
}
