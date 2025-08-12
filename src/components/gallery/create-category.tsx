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

const selectItems = [
  { label: "Indigo", color: "indigo", value: "indigo" },
  { label: "Vermelho", color: "red", value: "red" },
  { label: "Verde", color: "green", value: "green" },
  { label: "Amarelo", color: "amber", value: "amber" },
];

export function CreateCategory() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="secondary" className="text-xs" size="sm">
          <SquaresPlusIcon />
          Criar categoria
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="space-y-3">
        <div className="space-y-2">
          <div className="flex items-center gap-1.5">
            <SquaresPlusIcon className="size-3.5" />
            <h3 className="text-sm font-medium">Nova categoria</h3>
          </div>
          <p className="text-xs text-foreground/50">
            Preencha os campos para criar uma nova categoria de imagens.
          </p>
        </div>
        <form id="create-category-form" className="space-y-2">
          <div className="space-y-2">
            <Label className="text-xs">Nome</Label>
            <Input placeholder="Ideia de interfaces" />
          </div>
          <div className="space-y-2">
            <Label className="text-xs">Cor</Label>
            <Select>
              <SelectTrigger className="w-full text-sm p-2 border-border/60">
                <SelectValue placeholder="Escolha a cor" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel className="font-semibold">Cores disponíveis</SelectLabel>
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
          </div>
        </form>
        <Separator />
        <div>
          <Button
            form="create-category-form"
            className="w-full text-xs"
            size="sm"
            type="submit"
          >
            <PlusIcon className="size-3.5" />
            Criar categoria
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
