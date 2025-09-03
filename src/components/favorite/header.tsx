import { StarIcon } from "@heroicons/react/16/solid";
import { Questions } from "./questions";

export function Header() {
  return (
    <div className="w-full flex items-center justify-between py-2 px-5">
      <div className="cursor-default select-none">
        <div className="flex items-center gap-1.5">
          <StarIcon className="size-4.5 fill-yellow-400"/>
          <span className="font-medium text-sm">Favoritos</span>
        </div>
      </div>
      <div className="flex items-center">
        <Questions />
      </div>
    </div>
  );
}
