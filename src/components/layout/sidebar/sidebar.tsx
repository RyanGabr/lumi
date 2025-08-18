import {
  Cog8ToothIcon,
  PaperAirplaneIcon,
  StarIcon,
} from "@heroicons/react/16/solid";
import { Sidebar as SidebarComponent } from "./index";
import { useLocation } from "react-router-dom";
import { HomeIcon } from "@heroicons/react/20/solid";
import { useGetCategories } from "@/hooks/use-category";

const sidebarItems = [
  { label: "Início", icon: HomeIcon, href: "/gallery" },
  { label: "Favoritos", icon: StarIcon, href: "/favorites" },
  { label: "Enviar feedback", icon: PaperAirplaneIcon, href: "/feedback" },
  { label: "Configurações", icon: Cog8ToothIcon, href: "/feedback" },
];

export function Sidebar() {
  const location = useLocation();
  const { data: categories } = useGetCategories();

  return (
    <SidebarComponent.Root>
      <SidebarComponent.Perfil />
      <div className="flex flex-col gap-px">
        {sidebarItems.map((item, index) => {
          const IconName = item.icon;

          return (
            <SidebarComponent.Item
              href={item.href}
              key={index}
              className={`${
                location.pathname === item.href && "bg-foreground/6"
              }`}
            >
              <div className="flex items-center gap-2">
                <IconName className="size-4.5 fill-foreground/40" />
                {item.label}
              </div>
            </SidebarComponent.Item>
          );
        })}
      </div>
      <div className="flex flex-col gap-4 px-3">
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
