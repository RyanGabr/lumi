import { PlusIcon } from "@heroicons/react/16/solid";
import { CreateCollectionForm } from "../forms/create-collection-form";
import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";

export function CreateCollection() {
  const [dialogIsOpen, setDialogIsOpen] = useState(false);

  return (
    <Dialog open={dialogIsOpen} onOpenChange={setDialogIsOpen}>
      <DialogTrigger asChild>
        <button className="flex items-center gap-1 text-sm font-medium text-(--purple) dark:text-(--purple-2) cursor-pointer hover:bg-foreground/5 rounded-md py-1 px-3">
          <PlusIcon className="size-4" />
          Nova coleção
        </button>
      </DialogTrigger>
      <DialogContent className="w-xl dialog gap-0">
        <CreateCollectionForm onSuccess={() => setDialogIsOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}
