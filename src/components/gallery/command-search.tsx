import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "../ui/command";
import { useEffect, useState } from "react";
import {
  ArrowsUpDownIcon,
  ArrowUturnRightIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/16/solid";
import { StarIcon } from "@heroicons/react/20/solid";
import { Sidebar as SidebarComponent } from "../layout/sidebar";

export function CommandSearch() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <>
      <SidebarComponent.Button onClick={() => setOpen(true)}>
        <MagnifyingGlassIcon className="size-4.5 fill-foreground/40" />
        Buscar
      </SidebarComponent.Button>
      <CommandDialog
        open={open}
        onOpenChange={setOpen}
        className="rounded-lg border-border shadow-2xl shadow-black/80 lg:min-w-2xl h-96"
      >
        <CommandInput
          placeholder="Informe o título da imagem para pesquisar..."
          className="text-base font-medium truncate text-ellipsis"
        />
        <div className="flex flex-col justify-between h-full">
          <CommandList>
            <CommandEmpty className="text-foreground/50 py-6 text-center font-medium text-sm">
              Nenhuma resultado encontrado
            </CommandEmpty>
            <CommandGroup heading="Sugestões" className="pb-2">
              <CommandItem>
                <StarIcon />
                <span className="font-medium">Favoritos</span>
              </CommandItem>
            </CommandGroup>
          </CommandList>
          <div>
            <CommandSeparator />
            <div className="flex items-center gap-5 p-3">
              <div className="flex items-center gap-1.5 text-xs font-medium text-foreground/40">
                <ArrowsUpDownIcon className="size-3.5" />
                Selecionar
              </div>
              <div className="flex items-center gap-1.5 text-xs font-medium text-foreground/40">
                <ArrowUturnRightIcon className="size-3.5 rotate-180" />
                Abrir
              </div>
            </div>
          </div>
        </div>
      </CommandDialog>
    </>
  );
}
