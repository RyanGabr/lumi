import type { CollectionType } from "@/types/collection";
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale/pt-BR";
import { Link } from "react-router-dom";

interface CollectionCardProps {
  collection: CollectionType;
}

export function CollectionCard({ collection }: CollectionCardProps) {
  const date = parseISO(collection.created_at);

  const dateFormatted = format(date, "d 'de' MMM", {
    locale: ptBR,
  });

  return (
    <Link
      to={`/collection?${collection.id}`}
      className="w-[1fr] h-40 rounded-2xl dark:bg-foreground/5 flex flex-col justify-between transition-all dark:hover:bg-foreground/7 hover:bg-foreground/3 select-none border-1 border-border/60 dark:border-none"
    >
      <div className="relative">
        <div
          data-color={collection.color}
          className="h-12 rounded-t-2xl opacity-10"
        />
        <div
          data-color={collection.color}
          className="size-5 rounded-full absolute -bottom-2 left-5"
        />
      </div>
      <div className="p-4 pt-6 flex flex-col justify-between h-full">
        <h3 className="font-medium text-foreground/90 text-sm leading-4.5 line-clamp-2">
          {collection.name}
        </h3>
        <span className="text-xs font-medium text-muted-foreground/80">{dateFormatted}.</span>
      </div>
    </Link>
  );
}
