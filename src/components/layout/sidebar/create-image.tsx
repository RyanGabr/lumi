import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Sidebar as SidebarComponent } from ".";
import { PhotoIcon } from "@heroicons/react/16/solid";
import { CreateImageForm } from "@/components/forms/create-image-form";
import { useState } from "react";

export function CreateImage() {
  const [popoverIsOpen, setPopoverIsOpen] = useState(false);

  return (
    <Popover open={popoverIsOpen} onOpenChange={setPopoverIsOpen}>
      <PopoverTrigger asChild>
        <SidebarComponent.Button>
          <PhotoIcon className="size-4.5 fill-foreground/40" />
          Adicionar imagem
        </SidebarComponent.Button>
      </PopoverTrigger>
      <PopoverContent className="w-sm relative p-0 rounded-xl border-border cursor-default left-52" sideOffset={-10}>
        <CreateImageForm onSuccess={() => setPopoverIsOpen(false)} />
      </PopoverContent>
    </Popover>
  );
}
