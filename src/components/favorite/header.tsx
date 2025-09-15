import { Questions } from "./questions";
import { Star } from "lucide-react";

export function Header() {
  return (
    <div className="flex flex-col">
      <header className="w-full flex items-center justify-between py-2 px-5">
        {/* Left side */}
        <div className="cursor-default select-none">
          <span className="font-semibold text-sm">Favoritos</span>
        </div>

        {/* Right side */}
        <div className="flex items-center">
          <Questions />
        </div>
      </header>

      {/* Banner */}
      <div className="relative">
        <div className="h-32 w-full bg-foreground/10" />
        <div className="w-full xl:w-10/12 2xl:w-8/12 mx-auto px-5 md:px-10">
          <div className="size-16 bg-background rounded-xl border-2 border-border flex items-center justify-center absolute -bottom-10">
            <Star className="size-8 text-transparent fill-yellow-400" />
          </div>
        </div>
      </div>
    </div>
  );
}
