import {
    CursorArrowRaysIcon,
    FlagIcon,
    UserIcon,
} from "@heroicons/react/20/solid";

export function Tags() {
  return (
    <div className="flex items-center gap-3 justify-center">
      <div className="flex items-center gap-2 bg-foreground/5 rounded-full py-2.5 px-4 cursor-default select-none">
        <UserIcon className="size-5 fill-blue-400" />
        <span className="font-medium text-sm">Experiência do usuário</span>
      </div>
      <div className="flex items-center gap-2 bg-foreground/5 rounded-full py-2.5 px-4 cursor-default select-none">
        <FlagIcon className="size-5 fill-amber-400" />
        <span className="font-medium text-sm">Interface</span>
      </div>
      <div className="flex items-center gap-2 bg-foreground/5 rounded-full py-2.5 px-4 cursor-default select-none">
        <CursorArrowRaysIcon className="size-5 fill-indigo-400" />
        <span className="font-medium text-sm">Funcionalidades</span>
      </div>
    </div>
  );
}
