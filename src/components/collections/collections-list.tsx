import { useGetCollection } from "@/hooks/use-get-collection";
import { FolderClock, FolderClosed } from "lucide-react";
import { CreateCollection } from "../home/create-collection";
import { CollectionCard } from "../home/collection-card";

export function CollectionsList() {
  const { data: collections } = useGetCollection();

  const Header = () => (
    <span className="flex items-center gap-2 text-xs font-semibold text-foreground/50">
      <FolderClock className="size-3.5" />
      Coleções recentes
    </span>
  );

  if (!collections || collections.length === 0) {
    return (
      <div className="space-y-4 select-none">
        <Header />
        <div className="bg-foreground/3 w-full h-56 rounded-lg flex flex-col items-center justify-center gap-2 border dark:border-0 border-border/40">
          <FolderClosed className="size-10 text-ring" strokeWidth={1} />
          <h3 className="font-medium text-foreground/50 text-sm">
            Você ainda não possui nenhuma coleção
          </h3>
          <CreateCollection />
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 items-center">
      {collections.map((collection) => (
        <CollectionCard key={collection.id} collection={collection} />
      ))}
    </div>
  );
}
