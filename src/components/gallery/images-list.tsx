import { PhotoIcon } from "@heroicons/react/16/solid";

export function ImagesList() {
  return (
    <div className="space-y-4 h-full select-none">
      <span className="flex items-center gap-1.5 text-xs font-bold text-foreground/50">
        <PhotoIcon className="size-3.5" />
        Suas imagens
      </span>
      <div className="w-full h-5 bg-foreground/7 rounded"></div>
      <div className="w-1/2 h-5 bg-foreground/7 rounded"></div>
      <div className="w-1/3 h-5 bg-foreground/7 rounded"></div>
    </div>
  );
}
