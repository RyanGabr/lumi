import { Sidebar as SidebarComponent } from ".";
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover";
import { useState } from "react";
import { CreateCollectionForm } from "@/components/forms/create-collection-form";
import { FolderPlus } from "lucide-react";

export function CreateCollection() {
  const [popoverIsOpen, setPopoverIsOpen] = useState(false);

  return (
    <Popover open={popoverIsOpen} onOpenChange={setPopoverIsOpen}>
      <PopoverTrigger asChild>
        <SidebarComponent.Button>
          <FolderPlus strokeWidth={2.2} className="size-4.5 text-ring" />
          Nova coleção
        </SidebarComponent.Button>
      </PopoverTrigger>
      <PopoverContent
        className="left-50 w-sm relative p-0 rounded-xl"
        align="end"
        sideOffset={-10}
      >
        <CreateCollectionForm onSuccess={() => setPopoverIsOpen(false)}/>
      </PopoverContent>
    </Popover>
  );
}
