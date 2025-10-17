import { useState } from "react";
import { CreateImageForm } from "../forms/create-image-form";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { PlusIcon } from "@heroicons/react/20/solid";

export function CreateImage() {
  const [popoverIsOpen, setPopoverIsOpen] = useState(false);

  return (
    <Popover open={popoverIsOpen} onOpenChange={setPopoverIsOpen}>
      <PopoverTrigger asChild>
        <Button
          size="sm"
          variant="ghost"
          className="has-[>svg]:px-2 h-7 rounded-sm"
        >
          <PlusIcon />
          Adicionar imagem
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-sm relative p-0 rounded-xl border-border cursor-default"
        align="end"
      >
        <CreateImageForm onSuccess={() => setPopoverIsOpen(false)} />
      </PopoverContent>
    </Popover>
  );
}
