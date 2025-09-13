import { useCreateCategory } from "@/hooks/use-create-category";
import { createCategorySchema } from "@/schemas/create-category-schema";
import type { CreateCategoryFormType } from "@/types/category";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { categoryColors } from "@/lib/category-colors";
import { Button } from "../ui/button";
import { AtSign, CircleXIcon } from "lucide-react";
import { toast } from "sonner";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

// Using this prop to close the popover
interface CreateCategoryFormProps {
  onSuccess?: () => void;
}

export function CreateCategoryForm({ onSuccess }: CreateCategoryFormProps) {
  const { mutateAsync, isPending } = useCreateCategory();

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<CreateCategoryFormType>({
    resolver: zodResolver(createCategorySchema),
    defaultValues: {
      color: "",
    },
  });

  async function handleCreateCategory(data: CreateCategoryFormType) {
    await mutateAsync(data);

    onSuccess?.();

    // The setTimeout was applied so the user does not see the reset while the form is closing
    setTimeout(() => {
      reset();
    }, 500);

    toast.info("Categoria criada", {
      description: "Sua categoria foi criada com sucesso!",
      duration: 4000,
    });
  }

  return (
    <>
      <form
        onSubmit={handleSubmit(handleCreateCategory)}
        id="create-category-form"
        className="p-0"
      >
        <div className="flex flex-col">
          <div className="relative border-b border-border/50">
            <AtSign
              className="size-4.5 absolute top-1/2 -translate-y-1/2 left-3 text-foreground/60"
              strokeWidth={1.5}
            />
            <Input
              {...register("name")}
              placeholder="Insira um nome para a categoria"
              autoComplete="off"
              variant="blank"
              className="w-full p-3 pl-9"
            />
          </div>
          <div className="flex flex-col gap-3 p-3">
            {errors.name && (
              <Tooltip open={true}>
                <TooltipTrigger className=""></TooltipTrigger>
                <TooltipContent className="flex items-center gap-1">
                  <CircleXIcon className="size-3.5 text-red-400"/>
                  Preencha o campo inserindo o nome da categoria
                </TooltipContent>
              </Tooltip>
            )}
            <div>
              <Controller
                name="color"
                control={control}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="w-full border-none mb-0 dark:bg-foreground/5">
                      <SelectValue placeholder="Escolha uma cor" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {categoryColors.map((color) => (
                          <SelectItem
                            value={color.value}
                            key={color.value}
                            className="focus:bg-foreground/7"
                          >
                            <div
                              data-color={color.color}
                              className="size-2.5 rounded-full"
                            />
                            {color.label}
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

            <textarea
              {...register("description")}
              placeholder="Insira uma breve descrição..."
              className="px-2 py-1.5 rounded-md text-sm w-full focus:outline-none focus:ring ring-ring
              bg-foreground/5 col-span-2 h-24"
            />
          </div>
        </div>
      </form>
      <footer className="flex justify-end p-3 pt-0">
        <Button
          variant="blue"
          className="h-9 rounded-sm w-full text-xs"
          form="create-category-form"
          disabled={isPending}
        >
          Criar categoria
        </Button>
      </footer>
    </>
  );
}
