import { PlusIcon } from "@heroicons/react/16/solid";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { CreateImageForm } from "../forms/create-image-form";
import { useState } from "react";

export function CreateImage() {
  const [popoverIsOpen, setPopoverIsOpen] = useState(false);

  return (
    <Popover open={popoverIsOpen} onOpenChange={setPopoverIsOpen}>
      <PopoverTrigger asChild>
        <button className="size-40 bg-foreground/3 rounded-xl flex flex-col items-center justify-center gap-2 hover:border border-border/50 cursor-pointer">
          <PlusIcon className="size-7 fill-foreground/50" />
          <p className="font-semibold text-xs text-foreground/50">
            Nova imagem
          </p>
        </button>
      </PopoverTrigger>
      <PopoverContent
        className="w-sm relative p-0 rounded-xl border-border/50 cursor-default"
        align="start"
      >
        <CreateImageForm />
      </PopoverContent>
    </Popover>
  );
}
