import { Controller, useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import type { UpdateCollectionFormType } from "@/types/collection";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateCollectionSchema } from "@/schemas/update-collection-schema";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { collectionColors } from "@/lib/collection-colors";
import { useEffect, useState } from "react";
import { useUpdateCollection } from "@/hooks/use-update-collection";
import { useGetCollectionById } from "@/hooks/use-get-collection";
import { useLocation } from "react-router-dom";
import { Pencil } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

export function EditCollection() {
  const location = useLocation();
  const collectionId = location.search.replace("?", "");

  const { data: collection } = useGetCollectionById(collectionId);

  const [popoverIsOpen, setPopoverIsOpen] = useState(false);
  const { mutateAsync, isPending } = useUpdateCollection();

  const {
    register,
    handleSubmit,
    reset,
    control,
    watch,
    formState: { errors },
  } = useForm<UpdateCollectionFormType>({
    resolver: zodResolver(updateCollectionSchema),
  });

  const currentCategoryColor = watch("color");

  useEffect(() => {
    if (collection) {
      reset({
        name: collection.name ?? "",
        color: collection.color ?? "",
        description: collection.description ?? "",
      });
    }
  }, [collection, reset]);

  async function handleEditCollection(data: UpdateCollectionFormType) {
    await mutateAsync({
      ...data,
      id: collection.id,
    });

    setPopoverIsOpen(false);
    setTimeout(() => {
      reset();
    }, 500);
  }

  return (
    <Popover open={popoverIsOpen} onOpenChange={setPopoverIsOpen}>
      <PopoverTrigger>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size="sm"
              variant="ghost"
              className="has-[>svg]:px-2 h-7 rounded-sm"
            >
              <Pencil className="size-4.5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Editar</TooltipContent>
        </Tooltip>
      </PopoverTrigger>
      <PopoverContent
        className="w-sm relative p-0 rounded-xl border-border cursor-default"
        align="end"
      >
        <form
          onSubmit={handleSubmit(handleEditCollection)}
          id="edit-collection-form"
          className="p-0"
        >
          {/* Banner */}
          <div className="relative">
            <div
              data-color={currentCategoryColor}
              className="h-12 w-full opacity-10 rounded-t-xl"
            />
            <div className="absolute -bottom-5 pl-4">
              <Controller
                name="color"
                control={control}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="mb-0 rounded-full px-2 cursor-pointer dark:bg-popover bg-background">
                      <SelectValue placeholder="Cor" />
                    </SelectTrigger>
                    <SelectContent className="w-16">
                      <SelectGroup>
                        {collectionColors.map((color) => (
                          <SelectItem
                            value={color.value}
                            key={color.value}
                            className="focus:bg-foreground/7 py-1.5"
                          >
                            <div
                              data-color={color.color}
                              className="size-4 rounded-full"
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
          </div>

          <div className="flex flex-col gap-3 p-4 pt-8">
            <div>
              <Input
                {...register("name")}
                placeholder="Nome da coleção"
                autoComplete="off"
                variant="blank"
                className="font-semibold text-xl tracking-tight"
                autoFocus
              />
              {errors.name && (
                <span className="font-medium text-xs text-red-400">
                  {errors.name.message}
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
            variant="purple"
            className="h-9 rounded-sm w-full text-[13px]"
            form="edit-collection-form"
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
