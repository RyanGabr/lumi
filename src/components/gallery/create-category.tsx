import { PlusIcon, SquaresPlusIcon } from "@heroicons/react/16/solid";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createCategorySchema } from "@/schemas/create-category-schema";
import type { CreateCategoryFormType } from "@/types/category";
import { useState } from "react";
import { useUser } from "@supabase/auth-helpers-react";
import { useCreateCategory } from "@/hooks/use-category";

const selectItems = [
  { label: "Indigo", color: "indigo", value: "indigo" },
  { label: "Vermelho", color: "red", value: "red" },
  { label: "Verde", color: "green", value: "green" },
  { label: "Amarelo", color: "amber", value: "amber" },
];

export function CreateCategory() {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const user = useUser();
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
    await mutateAsync({
      ...data,
      user_id: user?.id!,
    });

    setIsPopoverOpen(false);
    reset();
  }

  return (
    <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
      <PopoverTrigger asChild>
        <Button variant="secondary" className="text-xs" size="sm">
          <SquaresPlusIcon />
          Criar categoria
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="space-y-3 w-sm">
        <div className="space-y-2">
          <div className="flex items-center gap-1.5">
            <SquaresPlusIcon className="size-3.5" />
            <h3 className="text-sm font-medium">Nova categoria</h3>
          </div>
          <p className="text-xs text-foreground/50">
            Preencha os campos para criar uma nova categoria de imagens.
          </p>
        </div>
        <form
          onSubmit={handleSubmit(handleCreateCategory)}
          id="create-category-form"
          className="space-y-3"
        >
          <div>
            <div className="space-y-1.5">
              <Label className="text-xs">Nome</Label>
              <Input {...register("name")} placeholder="Ideia de interfaces" />
            </div>
            {errors.name && (
              <span className="text-xs font-medium text-red-400">
                {errors.name.message}
              </span>
            )}
          </div>
          <div>
            <div className="space-y-1.5">
              <Label className="text-xs">Cor</Label>
              <Controller
                name="color"
                control={control}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="w-full text-sm p-2 border-border/60 mb-0">
                      <SelectValue placeholder="Escolha a cor" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel className="font-semibold">
                          Cores disponíveis
                        </SelectLabel>
                        {selectItems.map((item) => (
                          <SelectItem
                            value={item.value}
                            key={item.value}
                            className="focus:bg-foreground/7"
                          >
                            <div
                              data-color={item.color}
                              className="size-2 rounded-full"
                            />
                            {item.label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
            {errors.color && (
              <span className="text-xs font-medium text-red-400">
                {errors.color.message}
              </span>
            )}
          </div>
          <div>
            <div className="space-y-1.5">
              <Label className="text-xs">Descrição</Label>
              <textarea
                {...register("description")}
                placeholder="Ideias de interface inspiradoras"
                className="px-2 py-1.5 rounded-md border border-border/60 text-sm w-full focus:outline-none focus:ring ring-ring bg-accent h-20"
              />
            </div>
            {errors.description && (
              <span className="text-xs font-medium text-red-400">
                {errors.description.message}
              </span>
            )}
          </div>
        </form>
        <Separator />
        <div>
          <Button
            form="create-category-form"
            className="w-full text-xs"
            size="sm"
            type="submit"
            disabled={isPending}
          >
            <PlusIcon className="size-3.5" />
            Criar categoria
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
