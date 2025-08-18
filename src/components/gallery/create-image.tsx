import { PhotoIcon, PlusIcon } from "@heroicons/react/16/solid";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Separator } from "../ui/separator";
import FileUploader from "../ui/file-uploader";
import { useDialog } from "@/context/dialog-context";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useGetCategories } from "@/hooks/use-category";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createImageSchema } from "@/schemas/create-image-schema";
import type { CreateImageFormType } from "@/types/image";
import { useUser } from "@supabase/auth-helpers-react";
import { useCreateImage } from "@/hooks/use-images";
import { Loader2 } from "lucide-react";

export function CreateImage() {
  const { isOpen, setIsOpen } = useDialog();
  const { data: categories } = useGetCategories();
  const user = useUser();
  const { mutateAsync, isPending } = useCreateImage();

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<CreateImageFormType>({
    resolver: zodResolver(createImageSchema),
    defaultValues: {
      category_id: "",
      is_favorite: false,
    },
  });

  async function handleCreateImage(data: CreateImageFormType) {
    await mutateAsync({
      ...data,
      user_id: user?.id!,
    });

    setIsOpen(false);
    reset();
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
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
            <DialogTitle className="text-sm font-medium">
              Nova imagem
            </DialogTitle>
          </div>
        </div>
        <form
          onSubmit={handleSubmit(handleCreateImage)}
          id="create-image-form"
          className="space-y-5"
        >
          <div className="space-y-3">
            <div>
              {errors.name && (
                <span className="text-xs font-medium text-red-400">
                  {errors.name.message}
                </span>
              )}
              <input
                {...register("name")}
                type="text"
                className="font-semibold text-2xl w-full focus:outline-none"
                placeholder="Nome da imagem"
                autoComplete="off"
              />
            </div>
            <div>
              <textarea
                {...register("description")}
                className="font-medium text-sm w-full focus:outline-none text-foreground/60 h-14"
                placeholder="Insira uma descrição para a imagem (opcional)"
              />
            </div>
          </div>
          <Separator />
          <div className="space-y-0.5">
            <div className="space-y-3">
              <Label>Categoria</Label>
              <Controller
                name="category_id"
                control={control}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="w-full text-sm p-2 border-border/60 mb-0">
                      <SelectValue placeholder="Selecione a categoria" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel className="font-semibold">
                          Categorias disponíveis
                        </SelectLabel>
                        {categories.map((category) => (
                          <SelectItem
                            value={category.id}
                            key={category.id}
                            className="focus:bg-foreground/7"
                          >
                            <div
                              data-color={category.color}
                              className="size-2 rounded-full"
                            />
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
            {errors.category_id && (
              <span className="text-xs font-medium text-red-400">
                {errors.category_id.message}
              </span>
            )}
          </div>
          <Controller
            name="file"
            control={control}
            render={({ field }) => (
              <FileUploader value={field.value} onChange={field.onChange} />
            )}
          />
        </form>
        <Separator />
        <div className="flex items-center gap-2 justify-end">
          <DialogClose asChild>
            <Button className="text-xs" variant="secondary" size="sm">
              Cancelar
            </Button>
          </DialogClose>
          <Button
            form="create-image-form"
            className="text-xs"
            size="sm"
            disabled={isPending}
          >
            {isPending ? (
              <Loader2 className="animate-spin" />
            ) : (
              <PlusIcon className="size-3.5" />
            )}
            Adicionar imagem
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
