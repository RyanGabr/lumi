import { Sidebar as SidebarComponent } from ".";
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover";
import { useState } from "react";
import { CreateCategoryForm } from "../../forms/create-category-form";
import { Grid2x2PlusIcon } from "lucide-react";

export function CreateCategory() {
  const [popoverIsOpen, setPopoverIsOpen] = useState(false);

  return (
    <Popover open={popoverIsOpen} onOpenChange={setPopoverIsOpen}>
      <PopoverTrigger asChild>
        <SidebarComponent.Button>
          <Grid2x2PlusIcon strokeWidth={2.2} className="size-4.5 text-ring" />
          Nova categoria
        </SidebarComponent.Button>
      </PopoverTrigger>
      <PopoverContent
        className="left-50 w-sm relative p-0 rounded-xl border-border cursor-default"
        align="end"
        sideOffset={-10}
      >
        <CreateCategoryForm onSuccess={() => setPopoverIsOpen(false)}/>
      </PopoverContent>
    </Popover>
  );
}
