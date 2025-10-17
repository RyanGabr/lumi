import { Sidebar as SidebarComponent } from ".";
import { useState } from "react";
import { CreateCollectionForm } from "@/components/forms/create-collection-form";
import { FolderPlus } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

export function CreateCollection() {
  const [dialogIsOpen, setDialogIsOpen] = useState(false);

  return (
    <Dialog open={dialogIsOpen} onOpenChange={setDialogIsOpen}>
      <DialogTrigger asChild>
        <SidebarComponent.Button>
          <FolderPlus strokeWidth={2.2} className="size-4.5 text-ring" />
          Nova coleção
        </SidebarComponent.Button>
      </DialogTrigger>
      <DialogContent
        className="w-xl dialog gap-0"
      >
        <CreateCollectionForm onSuccess={() => setDialogIsOpen(false)}/>
      </DialogContent>
    </Dialog>
  );
}
