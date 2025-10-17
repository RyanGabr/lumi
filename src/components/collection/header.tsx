import { useGetCollectionById } from "@/hooks/use-get-collection";
import { FolderIcon } from "@heroicons/react/20/solid";
import { useLocation } from "react-router-dom";
import { DeleteCollection } from "./delete-collection";
import { CreateImage } from "./create-image";
import { EditCollection } from "./edit-collection";
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale/pt-BR";

export function Header() {
  const location = useLocation();
  const collectionId = location.search.replace("?", "");

  const { data: collection } = useGetCollectionById(collectionId);

  const date = parseISO(collection.created_at);

  const dateFormatted = format(date, "d 'de' MMMM", {
    locale: ptBR,
  });

  return (
    <div className="flex flex-col">
      <header className="w-full flex items-center justify-between py-2 px-5">
        {/* Left side */}
        <span className="font-medium text-sm truncate text-ellipsis">
          {collection?.name}
        </span>

        {/* Right side */}
        <div className="flex items-center">
          <span className="font-medium text-sm text-foreground/40 mr-2 select-none hidden lg:block">
            Criada em {dateFormatted}
          </span>
          <CreateImage />
          <EditCollection />
          <DeleteCollection />
        </div>
      </header>

      {/* Banner */}
      <div className="relative">
        <div data-color={collection.color} className="h-36 w-full opacity-10" />
        <div className="w-full xl:w-10/12 2xl:w-8/12 mx-auto px-5 md:px-10">
          <div
            data-color={collection.color}
            className="size-14 rounded-xl border-2 border-background flex items-center justify-center absolute -bottom-10 p-2"
          >
            <FolderIcon className="fill-white" />
          </div>
        </div>
      </div>
    </div>
  );
}
