import { ArrowRightIcon } from "@heroicons/react/16/solid";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Logo } from "../ui/logo";

export function GalleryHero() {
  return (
    <div className="w-full flex flex-col items-center justify-center gap-6 h-52">
      <div className="flex items-center gap-2">
        <Logo />
        <h1 className="font-bold text-[26px] text-foreground/90 tracking-tight">
          Encontre suas imagens de forma rápida
        </h1>
      </div>
      <div className="relative w-full">
        <Input
          className="bg-foreground/3 border-border/50 font-medium text-[15px] py-3.5 px-5
          ring-ring/30 rounded-xl text-foreground/90"
          placeholder="Pesquise pelo título da imagem que deseja..."
        />
        <Button
          className="size-6 absolute right-3 top-1/2 -translate-y-1/2 rounded-full cursor-pointer"
          size="icon"
          disabled
        >
          <ArrowRightIcon />
        </Button>
      </div>
    </div>
  );
}
