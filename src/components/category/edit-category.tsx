import { Controller, useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import type { EditCategoryFormType } from "@/types/category";
import { zodResolver } from "@hookform/resolvers/zod";
import { editCategorySchema } from "@/schemas/edit-category-schema";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select";
import { categoryColors } from "@/lib/category-colors";
import { useEffect, useState } from "react";
import { useEditCategory, useGetCategoryById } from "@/hooks/use-category";
import { useLocation } from "react-router-dom";

export function EditCategory() {
  const location = useLocation();
  const categoryId = location.search.replace("?", "");

  const { data: category } = useGetCategoryById(categoryId);

  const [popoverIsOpen, setPopoverIsOpen] = useState(false);
  const { mutateAsync, isPending } = useEditCategory();

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<EditCategoryFormType>({
    resolver: zodResolver(editCategorySchema),
  });

  useEffect(() => {
    if (category) {
      reset({
        name: category.name ?? "",
        color: category.color ?? "",
        description: category.description ?? "",
      });
    }
  }, [category, reset]);

  async function handleEditCategory(data: EditCategoryFormType) {
    await mutateAsync({
      ...data,
      id: category.id,
    });

    setPopoverIsOpen(false);
    setTimeout(() => {
      reset();
    }, 500);
  }

  return (
    <Popover open={popoverIsOpen} onOpenChange={setPopoverIsOpen}>
      <PopoverTrigger asChild>
        <Button
          size="sm"
          variant="ghost"
          className="has-[>svg]:px-2 h-7 rounded-sm"
        >
          Editar
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-sm relative p-0 rounded-xl border-border cursor-default"
        align="end"
      >
        <form
          onSubmit={handleSubmit(handleEditCategory)}
          id="edit-category-form"
          className="p-4"
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
            className="gap-1 text-xs h-8 rounded-sm w-full font-semibold"
            form="edit-category-form"
            disabled={isPending}
            type="submit"
          >
            Editar
          </Button>
        </footer>
      </PopoverContent>
    </Popover>
  );
}
