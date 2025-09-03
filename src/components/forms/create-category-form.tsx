import { useCreateCategory } from "@/hooks/use-category";
import { createCategorySchema } from "@/schemas/create-category-schema";
import type { CreateCategoryFormType } from "@/types/category";
import { zodResolver } from "@hookform/resolvers/zod";
import { PopoverClose } from "@radix-ui/react-popover";
import { X } from "lucide-react";
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
  }

  return (
    <>
      <header className="flex items-center justify-between p-4">
        <h3 className="font-medium text-sm">Adicionar nova categoria</h3>
        <PopoverClose className="cursor-pointer p-0.5 rounded hover:bg-foreground/5">
          <X className="size-5 text-foreground/40" />
        </PopoverClose>
      </header>
      <form
        onSubmit={handleSubmit(handleCreateCategory)}
        id="create-category-form"
        className="p-4 pt-0"
      >
        <div className="grid grid-cols-2 gap-3">
          <div>
            <Input
              {...register("name")}
              placeholder="Nome da categoria"
              autoComplete="off"
            />
            {errors.name && (
              <span className="font-medium text-xs text-red-400">
                {errors.name.message}
              </span>
            )}
          </div>
          <div>
            <Controller
              name="color"
              control={control}
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="w-full border-border/40 mb-0 dark:bg-foreground/5">
                    <SelectValue placeholder="Cor" />
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
              bg-foreground/5 col-span-2 h-24 border border-border/40"
          />
        </div>
      </form>
      <footer className="flex justify-end p-4 pt-0">
        <Button
          variant="blue"
          className="text-xs h-8 rounded-sm w-full font-semibold"
          form="create-category-form"
          disabled={isPending}
        >
          Adicionar
        </Button>
      </footer>
    </>
  );
}
