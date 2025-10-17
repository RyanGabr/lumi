import { useGetCollectionById } from "@/hooks/use-get-collection";
import { useLocation } from "react-router-dom";

export function Overview() {
  const location = useLocation();

  const collectionId = location.search.replace("?", "");
  const { data: collection } = useGetCollectionById(collectionId);

  return (
    <div className="space-y-2">
      <h1 className="font-bold text-3xl tracking-tight text-foreground/90">
        {collection?.name}
      </h1>
      {collection.description && (
        <p className="text-sm font-medium text-foreground/50">
          {collection.description}
        </p>
      )}
    </div>
  );
}
