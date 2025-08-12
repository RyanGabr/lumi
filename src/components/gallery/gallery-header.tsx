import {
  AdjustmentsHorizontalIcon,
  PlusIcon
} from "@heroicons/react/16/solid";
import { Header } from "../layout/header";
import { Button } from "../ui/button";
import { CommandSearch } from "./command-search";
import { CreateCategory } from "./create-category";

export function GalleryHeader() {
  return (
    <Header.Root>
      <Header.Title>Bem-vindo ao Lumi</Header.Title>
      <Header.Actions>
        <Button size="sm" className="rounded-full" variant="secondary">
          <AdjustmentsHorizontalIcon />
        </Button>
        <CommandSearch />
        <CreateCategory />
        <Button variant="secondary" className="text-xs" size="sm">
          <PlusIcon />
          Adicionar imagem
        </Button>
      </Header.Actions>
    </Header.Root>
  );
}
