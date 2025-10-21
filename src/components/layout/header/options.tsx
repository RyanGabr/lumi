import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Ellipsis, ImagePlus, Plus } from "lucide-react";

export function Options() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button>
          <Ellipsis />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64 p-2 rounded-lg dark:shadow-black/30 shadow-2xl" align="end">
        <DropdownMenuGroup className="text-foreground/85">
          <DropdownMenuItem className="text-base">
            <Plus className="size-4.5"/>
            Nova coleção
          </DropdownMenuItem>
          <DropdownMenuItem className="text-base">
            <ImagePlus className="size-4.5"/>
            Adicionar imagem
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
