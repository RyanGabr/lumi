import { PlusIcon } from "@heroicons/react/16/solid";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { CreateCollectionForm } from "../forms/create-collection-form";
import { useState } from "react";

export function CreateCollection() {
  const [popoverIsOpen, setPopoverIsOpen] = useState(false);

  return (
    <Popover open={popoverIsOpen} onOpenChange={setPopoverIsOpen}>
      <PopoverTrigger asChild>
        <button className="flex items-center gap-1 text-sm font-medium text-(--purple) dark:text-(--purple-2) cursor-pointer hover:bg-foreground/5 rounded-md py-1 px-3">
          <PlusIcon className="size-4" />
          Nova coleção
        </button>
      </PopoverTrigger>
      <PopoverContent
        className="w-sm p-0 rounded-xl dark:border-border/50 border-border/70"
        align="center"
      >
        <CreateCollectionForm onSuccess={() => setPopoverIsOpen(false)} />
      </PopoverContent>
    </Popover>
  );
}
