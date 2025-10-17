import { Button } from "../ui/button";
import FileUploader from "../ui/file-uploader";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createImageSchema } from "@/schemas/create-image-schema";
import type { CreateImageFormType } from "@/types/image";
import { useCreateImage } from "@/hooks/use-create-image";
import { useLocation } from "react-router-dom";
import { toast } from "sonner";
import { InformationCircleIcon } from "@heroicons/react/16/solid";

// Using this prop to close the popover
interface CreateImageFormProps {
  onSuccess?: () => void;
}

export function CreateImageForm({ onSuccess }: CreateImageFormProps) {
  const { mutateAsync, isPending } = useCreateImage();

  // If the user is on a specific collection page, capture the id
  const location = useLocation();
  const collectionId = location.search.replace("?", "");

  const {
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<CreateImageFormType>({
    resolver: zodResolver(createImageSchema),
    defaultValues: {
      description: undefined,
      category_id: collectionId ? collectionId : undefined, // If collectionId exists in the search parameters, it means the user is on a page of a specific collection and will create the image through the collection. Then use the collectionId to create the image.
      is_favorite: false,
    },
    mode: "onSubmit",
  });

  async function handleCreateImage(data: CreateImageFormType) {
    await mutateAsync(data);

    onSuccess?.();
    reset();

    toast("Imagem criada", {
      description: "Sua imagem foi inserida com sucesso!",
      icon: <InformationCircleIcon />,
      duration: 4000
    });
  }

  return (
    <>
      <form
        onSubmit={handleSubmit(handleCreateImage)}
        id="create-image-form"
        className="p-3"
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
      <footer className="flex justify-end p-3 pt-0">
        <Button
          variant="purple"
          className="h-9 rounded-sm w-full text-[13px]"
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
