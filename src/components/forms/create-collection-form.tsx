import { useCreateCollection } from "@/hooks/use-create-collection";
import { createCollectionSchema } from "@/schemas/create-collection-schema";
import type { CreateCollectionFormType } from "@/types/collection";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
} from "../ui/select";
import { collectionColors } from "@/lib/collection-colors";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { FolderIcon } from "@heroicons/react/20/solid";

// Using this prop to close the diaog
interface CreateCollectionFormProps {
  onSuccess?: () => void;
}

export function CreateCollectionForm({ onSuccess }: CreateCollectionFormProps) {
  const { mutateAsync, isPending } = useCreateCollection();

  const {
    register,
    handleSubmit,
    reset,
    control,
    watch,
    formState: { errors },
  } = useForm<CreateCollectionFormType>({
    resolver: zodResolver(createCollectionSchema),
    defaultValues: {
      color: "indigo",
    },
  });

  const currentCollectionColor: string = watch("color");

  async function handleCreateCollection(data: CreateCollectionFormType) {
    await mutateAsync(data);

    onSuccess?.();

    // The setTimeout was applied so the user does not see the reset while the form is closing
    setTimeout(() => {
      reset();
    }, 500);

    toast.info("Coleção criada", {
      description: "Sua coleção foi criada com sucesso!",
      duration: 4000,
    });
  }

  return (
    <>
      <form
        onSubmit={handleSubmit(handleCreateCollection)}
        id="create-collection-form"
        className="p-0"
      >
        <div className="flex flex-col items-center justify-center gap-5 lg:p-10 pt-5">
          {/* Collection color */}
          <div>
            <Controller
              name="color"
              control={control}
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="data-[size=default]:h-14 w-14 border-border/70 dark:border-none mb-0 dark:bg-foreground/5 flex items-center justify-center cursor-pointer">
                    <FolderIcon
                      data-fill={currentCollectionColor}
                      className="size-8"
                    />
                  </SelectTrigger>
                  <SelectContent align="center">
                    <SelectGroup className="flex">
                      {collectionColors.map((color) => (
                        <SelectItem
                          value={color.value}
                          key={color.value}
                          className="focus:bg-foreground/7 p-2"
                        >
                          <FolderIcon
                            data-fill={color.color}
                            className="size-5"
                          />
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.color && (
              <span className="font-medium text-xs text-red-400">
                {errors.color.message}
              </span>
            )}
          </div>

          <h1 className="font-semibold text-2xl">Nova coleção</h1>

          {/* Collection name */}
          <div className="w-full">
            <Input
              {...register("name")}
              placeholder="Dê uma nome para sua coleção..."
              className="p-3"
              autoFocus
              autoComplete="off"
            />
            {errors.name && (
              <span className="font-medium text-xs text-red-400">
                Preencha o campo inserindo o nome da coleção
              </span>
            )}
          </div>

          {/* Collection description */}
          <div className="w-full">
            <textarea
              {...register("description")}
              placeholder="Insira uma breve descrição..."
              className="p-3 rounded-md text-sm w-full focus:outline-none focus:ring dark:ring-ring
              ring-(--purple) bg-foreground/5 col-span-2 h-24 border border-border/40"
            />
          </div>
        </div>
      </form>
      <footer className="flex justify-end lg:px-10 lg:pb-5 pt-0">
        <Button
          variant="purple"
          className="h-10 rounded-sm w-full text-[13px]"
          form="create-collection-form"
          disabled={isPending}
        >
          Criar coleção
        </Button>
      </footer>
    </>
  );
}
