import { EmptyTrash } from "./empty-trash";
import { TrashIcon } from "@heroicons/react/20/solid";

export function Header() {
  return (
    <div className="flex flex-col">
      <header className="w-full flex items-center justify-between py-2 px-5">
        {/* Left side */}
        <div className="cursor-default select-none flex items-center gap-1.5">
          <TrashIcon className="size-4.5 fill-ring"/>
          <span className="font-medium text-sm">Lixeira</span>
        </div>

        {/* Right side */}
        <div className="flex items-center">
          <EmptyTrash />
        </div>
      </header>

      {/* Banner */}
      <div className="relative">
        <div className="bg-foreground h-10 lg:h-36 w-full opacity-0 lg:opacity-10" />
        <div className="w-full xl:w-10/12 2xl:w-8/12 mx-auto px-5 md:px-10">
          <div className="bg-ring size-14 rounded-xl border-2 border-background flex items-center justify-center absolute -bottom-10 p-2">
            <TrashIcon className="fill-white" />
          </div>
        </div>
      </div>
    </div>
  );
}
