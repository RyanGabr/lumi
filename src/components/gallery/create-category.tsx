import { PlusIcon, SquaresPlusIcon } from "@heroicons/react/16/solid";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createCategorySchema } from "@/schemas/create-category-schema";
import { useUser } from "@supabase/auth-helpers-react";
import { useCreateCategory } from "@/hooks/use-category";
import { useCategoryPopover } from "@/context/category-popover-context";
import { Sidebar as SidebarComponent } from "../layout/sidebar";
import { Button } from "../ui/button";
import type { CreateCategoryFormType } from "@/types/category";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { PopoverClose } from "@radix-ui/react-popover";
import { X } from "lucide-react";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const colors = [
  { label: "Indigo", color: "indigo", value: "indigo" },
  { label: "Vermelho", color: "red", value: "red" },
  { label: "Verde", color: "green", value: "green" },
  { label: "Amarelo", color: "amber", value: "amber" },
  { label: "Azul", color: "blue", value: "blue" },
  { label: "Rosa", color: "pink", value: "pink" },
];

export function CreateCategory() {
  const { isOpen, setIsOpen, closePopover } = useCategoryPopover();
  const { mutateAsync, isPending } = useCreateCategory();
  const user = useUser();

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
    await mutateAsync({
      ...data,
      user_id: user?.id!,
    });

    closePopover();
    reset();
  }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <SidebarComponent.Button>
          <SquaresPlusIcon className="size-4.5 fill-foreground/40" />
          Nova categoria
        </SidebarComponent.Button>
      </PopoverTrigger>
      <PopoverContent
        className="left-50 relative rounded-xl w-md p-3.5 space-y-3"
        sideOffset={-10}
      >
        <header className="flex items-center justify-between">
          <h3 className="font-medium text-sm">Adicionar nova categoria</h3>
          <PopoverClose className="cursor-pointer p-0.5 rounded hover:bg-foreground/5">
            <X className="size-5 text-foreground/40" />
          </PopoverClose>
        </header>
        <form
          onSubmit={handleSubmit(handleCreateCategory)}
          id="create-category-form"
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
                    <SelectTrigger className="w-full border-none mb-0 dark:bg-foreground/5">
                      <SelectValue placeholder="Cor" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {colors.map((color) => (
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
        </form>
        <footer className="flex justify-end">
          <Button
            className="gap-1 text-xs h-7 bg-blue-400/80 text-white hover:bg-blue-400/70"
            size="sm"
            form="create-category-form"
            disabled={isPending}
          >
            <PlusIcon />
            Adicionar
          </Button>
        </footer>
      </PopoverContent>
    </Popover>
  );
}
