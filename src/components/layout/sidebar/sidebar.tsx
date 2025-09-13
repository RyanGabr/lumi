import { Sidebar as SidebarComponent } from "./index";
import { useLocation } from "react-router-dom";
import { useGetCategories } from "@/hooks/use-get-categories";
import { CreateCategory } from "./create-category";
import { CreateImage } from "./create-image";
import { Inbox, Send, Settings, Star } from "lucide-react";

const sidebarItems = [
  { label: "Página inicial", icon: Inbox, href: "/gallery" },
  { label: "Favoritos", icon: Star, href: "/favorite" },
  { label: "Enviar feedback", icon: Send, href: "/feedback" },
  { label: "Configurações", icon: Settings, href: "/settings" },
];

export function Sidebar() {
  const location = useLocation();
  const { data: categories } = useGetCategories();

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
                location.pathname === item.href && "bg-foreground/6 text-foreground/90"
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
          <CreateCategory />
          <CreateImage />
        </div>
      </div>

      <div className="flex flex-col gap-3 px-3">
        <div className="font-medium text-[13px] text-foreground/50">
          Minhas categorias
        </div>
        <div className="flex flex-col gap-3">
          {!categories || categories.length === 0 ? (
            <span className="text-foreground/50 text-sm">
              Nenhuma categoria
            </span>
          ) : (
            categories?.map((category, index) => {
              return (
                <SidebarComponent.Category
                  key={index}
                  href={`/category?${category.id}`}
                >
                  <div className="flex items-center gap-2">
                    <div
                      data-color={category.color}
                      className="size-2.5 rounded-full"
                    />
                    <span className="truncate text-ellipsis max-w-36">
                      {category.name}
                    </span>
                  </div>
                </SidebarComponent.Category>
              );
            })
          )}
        </div>
      </div>
    </SidebarComponent.Root>
  );
}
