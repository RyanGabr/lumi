import { CategoryCard } from "@/components/gallery/category-card";
import { CommandSearch } from "@/components/gallery/command-search";
import { Header } from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import {
  AdjustmentsHorizontalIcon, PhotoIcon,
  PlusIcon,
  Squares2X2Icon,
  SquaresPlusIcon
} from "@heroicons/react/16/solid";

const categoies = [
  { category_name: "Kubo | Gerenciamento de estoque", image_quantity: 8 },
  { category_name: "Ideias de interface", image_quantity: 20 },
  { category_name: "Importante", image_quantity: 4 },
];

export function Gallery() {
  return (
    <div className="space-y-7">
      <Header.Root>
        <Header.Title>Bem-vindo ao Lumi</Header.Title>
        <Header.Actions>
          <Button size="sm" className="rounded-full" variant="secondary">
            <AdjustmentsHorizontalIcon />
          </Button>
          <CommandSearch />
          <Button variant="secondary" className="text-xs" size="sm">
            <SquaresPlusIcon />
            Criar categoria
          </Button>
          <Button variant="secondary" className="text-xs" size="sm">
            <PlusIcon />
            Adicionar imagem
          </Button>
        </Header.Actions>
      </Header.Root>
      <div className="space-y-4">
        <span className="flex items-center gap-1.5 text-xs font-bold text-foreground/50">
          <Squares2X2Icon className="size-3.5" />
          Categorias
        </span>
        <div className="grid grid-cols-5 gap-5 items-center">
          {categoies.map((item, index) => (
            <CategoryCard
              key={index}
              category_name={item.category_name}
              image_quantity={item.image_quantity}
            />
          ))}
        </div>
      </div>
      <div className="space-y-4 h-full">
        <span className="flex items-center gap-1.5 text-xs font-bold text-foreground/50">
          <PhotoIcon className="size-3.5" />
          Suas imagens
        </span>
        <div className="w-full h-5 bg-foreground/7 rounded"></div>
        <div className="w-1/2 h-5 bg-foreground/7 rounded"></div>
        <div className="w-1/3 h-5 bg-foreground/7 rounded"></div>
      </div>
    </div>
  );
}
