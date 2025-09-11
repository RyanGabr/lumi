import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Sidebar as SidebarComponent } from ".";
import { CreateImageForm } from "@/components/forms/create-image-form";
import { useState } from "react";
import { ImagePlus } from "lucide-react";

export function CreateImage() {
  const [popoverIsOpen, setPopoverIsOpen] = useState(false);

  return (
    <Popover open={popoverIsOpen} onOpenChange={setPopoverIsOpen}>
      <PopoverTrigger asChild>
        <SidebarComponent.Button>
          <ImagePlus strokeWidth={2.2} className="size-4.5 text-ring" />
          Adicionar imagem
        </SidebarComponent.Button>
      </PopoverTrigger>
      <PopoverContent className="w-sm relative p-0 rounded-xl border-border/50 left-52" sideOffset={-10}>
        <CreateImageForm onSuccess={() => setPopoverIsOpen(false)} />
      </PopoverContent>
    </Popover>
  );
}
