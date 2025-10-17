import { Sidebar as SidebarComponent } from "./index";
import { useLocation } from "react-router-dom";
import { useGetCollection } from "@/hooks/use-get-collection";
import { CreateCollection } from "./create-collection";
import { CreateImage } from "./create-image";
import { Folders, Inbox, SendHorizonal, Star, Trash2 } from "lucide-react";

const sidebarItems = [
  { label: "Página inicial", icon: Inbox, href: "/home" },
  { label: "Coleções", icon: Folders, href: "/collections" },
  { label: "Favoritos", icon: Star, href: "/favorite" },
  { label: "Lixeira", icon: Trash2, href: "/trash" },
  { label: "Feedback", icon: SendHorizonal, href: "/feedback" },
];

export function Sidebar() {
  const location = useLocation();
  const { data: collections } = useGetCollection();

  return (
    <SidebarComponent.Root>
      <div className="space-y-2">
        <SidebarComponent.Perfil />
        <div className="flex flex-col gap-px">
          {sidebarItems.map((item, index) => {
            const IconName = item.icon;

            return (
              <SidebarComponent.Item
                href={item.href}
                key={index}
                className={`${
                  location.pathname === item.href &&
                  "bg-foreground/6 text-foreground/90"
                }`}
              >
                <IconName strokeWidth={2.2} className="size-4.5 text-ring" />
                {item.label}
              </SidebarComponent.Item>
            );
          })}
        </div>
      </div>

      <div className="space-y-2">
        <div className="font-medium text-[13px] text-foreground/50 px-3">
          Galeria
        </div>
        <div className="flex flex-col gap-px">
          <CreateCollection />
          <CreateImage />
        </div>
      </div>

      <div className="flex flex-col gap-3 px-3">
        <div className="font-medium text-[13px] text-foreground/50">
          Minhas coleções
        </div>
        <div className="flex flex-col gap-3">
          {!collections || collections.length === 0 ? (
            <span className="text-foreground/50 text-sm">
              Nenhuma coleção
            </span>
          ) : (
            collections?.map((collection, index) => {
              return (
                <SidebarComponent.Collection
                  key={index}
                  href={`/collection?${collection.id}`}
                >
                  <div className="flex items-center gap-2">
                    <div
                      data-color={collection.color}
                      className="size-2.5 rounded-full"
                    />
                    <span className="truncate text-ellipsis max-w-36">
                      {collection.name}
                    </span>
                  </div>
                </SidebarComponent.Collection>
              );
            })
          )}
        </div>
      </div>
    </SidebarComponent.Root>
  );
}
