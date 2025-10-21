import { Search } from "lucide-react";
import { Input } from "../ui/input";

export function Header() {
  return (
    <header className="h-44 flex flex-col gap-4 justify-center">
      <h1 className="font-bold text-3xl text-foreground/90 tracking-tight">
        Todas as coleções
      </h1>
      <div className="relative">
        <Search className="absolute size-4 text-ring top-1/2 -translate-y-1/2 left-3"/>
        <Input placeholder="Buscar coleções..." className="py-2 px-8.5 font-medium" />
      </div>
    </header>
  );
}
