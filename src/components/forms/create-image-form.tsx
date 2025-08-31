import { Button } from "../ui/button";
import FileUploader from "../ui/file-uploader";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createImageSchema } from "@/schemas/create-image-schema";
import type { CreateImageFormType } from "@/types/image";
import { useUser } from "@supabase/auth-helpers-react";
import { useCreateImage } from "@/hooks/use-images";
import { PopoverClose } from "@radix-ui/react-popover";
import { X } from "lucide-react";
import { useLocation } from "react-router-dom";

// Using this prop to close the popover
interface CreateImageFormProps {
  onSuccess?: () => void;
}

export function CreateImageForm({ onSuccess }: CreateImageFormProps) {
  const user = useUser();
  const { mutateAsync, isPending } = useCreateImage();

  // If the user is on a specific category page, capture the id
  const location = useLocation();
  const categoryId = location.search.replace("?", "");

  const {
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<CreateImageFormType>({
    resolver: zodResolver(createImageSchema),
    defaultValues: {
      description: undefined,
      category_id: categoryId ? categoryId : undefined, // If categoryId exists in the search parameters, it means the user is on a page of a specific category and will create the image through the category. Then use the categoryId to create the image.
      is_favorite: false,
    },
    mode: "onSubmit",
  });

  async function handleCreateImage(data: CreateImageFormType) {
    await mutateAsync({
      ...data,
      user_id: user?.id!,
    });

    onSuccess?.();
    reset();
  }

  return (
    <>
      <header className="flex items-start justify-between p-4">
        <div className="space-y-1">
          <h3 className="font-medium text-sm">Adicionar imagem</h3>
          {/* If categoryId exists => user is on a specific category page */}
          {categoryId ? (
            <p className="text-xs text-foreground/40">
              A imagem será inserida nesta categoria.
            </p>
          ) : (
            <p className="text-xs text-foreground/40">
              A imagem será inserida na sua galeria.
            </p>
          )}
        </div>
        <PopoverClose className="cursor-pointer p-0.5 rounded hover:bg-foreground/5">
          <X className="size-5 text-foreground/40" />
        </PopoverClose>
      </header>
      <form
        onSubmit={handleSubmit(handleCreateImage)}
        id="create-image-form"
        className="p-4 pt-0"
      >
        <div className="grid grid-cols-2 gap-3">
          <div className="col-span-2">
            <Controller
              name="file"
              control={control}
              render={({ field }) => (
                <FileUploader value={field.value} onChange={field.onChange} />
              )}
            />
            {errors.file && (
              <span className="font-medium text-xs text-red-400">
                {errors.file.message}
              </span>
            )}
          </div>
        </div>
      </form>
      <footer className="flex justify-end p-4 pt-0">
        <Button
          variant="blue"
          className="gap-1 text-xs h-8 rounded-sm w-full font-semibold"
          form="create-image-form"
          disabled={isPending}
          type="submit"
        >
          Adicionar
        </Button>
      </footer>
    </>
  );
}
