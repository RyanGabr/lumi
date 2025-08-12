import { PhotoIcon, PlusIcon } from "@heroicons/react/16/solid";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "../ui/dialog";
import { Separator } from "../ui/separator";
import FileUploader from "../ui/file-uploader";

export function CreateImage() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary" className="text-xs" size="sm">
          <PlusIcon />
          Adicionar imagem
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-xl space-y-3 bg-popover py-5">
        <div className="space-y-2">
          <div className="flex items-center gap-1.5">
            <PhotoIcon className="size-3.5" />
            <h3 className="text-sm font-medium">Nova imagem</h3>
          </div>
        </div>
        <form className="space-y-5">
          <div className="space-y-3">
            <input
              type="text"
              className="font-semibold text-2xl w-full focus:outline-none"
              placeholder="Título da imagem"
            />
            <textarea
              className="font-medium text-sm w-full focus:outline-none text-foreground/60 h-14"
              placeholder="Insira uma descrição para a imagem (opcional)"
            />
          </div>
          <Separator />
          <FileUploader />
        </form>
        <Separator />
        <div className="flex items-center gap-2 justify-end">
          <DialogClose asChild>
            <Button className="text-xs" variant="secondary" size="sm">
              Cancelar
            </Button>
          </DialogClose>
          <Button className="text-xs" size="sm">
            <PlusIcon className="size-3.5" />
            Adicionar imagem
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
