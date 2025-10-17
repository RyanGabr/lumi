import { StarIcon } from "lucide-react";
import { Questions } from "./questions";

export function Header() {
  return (
    <div className="flex flex-col">
      <header className="w-full flex items-center justify-between py-2 px-5">
        {/* Left side */}
        <div className="cursor-default select-none flex items-center gap-1.5">
          <StarIcon className="size-4.5 fill-amber-400 text-transparent"/>
          <span className="font-medium text-sm">Favoritos</span>
        </div>

        {/* Right side */}
        <div className="flex items-center">
          <Questions />
        </div>
      </header>

      {/* Banner */}
      <div className="relative">
        <div className="bg-yellow-400 h-36 w-full opacity-10" />
        <div className="w-full xl:w-10/12 2xl:w-8/12 mx-auto px-5 md:px-10">
          <div
            className="bg-background size-14 rounded-xl border-2 border-border flex items-center justify-center absolute -bottom-10 p-2"
          >
            <StarIcon className="fill-amber-400 text-transparent size-16" />
          </div>
        </div>
      </div>
    </div>
  );
}
