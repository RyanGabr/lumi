import { PlusIcon } from "@heroicons/react/16/solid";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { CreateCategoryForm } from "../forms/create-category-form";
import { useState } from "react";

export function CreateCategory() {
  const [popoverIsOpen, setPopoverIsOpen] = useState(false);

  return (
    <Popover open={popoverIsOpen} onOpenChange={setPopoverIsOpen}>
      <PopoverTrigger asChild>
        <button className="flex items-center gap-1 text-sm font-medium text-blue-400 cursor-pointer hover:bg-foreground/5 rounded-md py-1 px-3">
          <PlusIcon className="size-4" />
          Nova categoria
        </button>
      </PopoverTrigger>
      <PopoverContent
        className="w-sm relative p-0 rounded-xl border-border cursor-default"
        align="center"
      >
        <CreateCategoryForm onSuccess={() => setPopoverIsOpen(false)}/>
      </PopoverContent>
    </Popover>
  );
}
