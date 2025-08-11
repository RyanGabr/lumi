import { PhotoIcon, StarIcon } from "@heroicons/react/16/solid";
import { Sidebar as SidebarComponent } from "./index";
import { useLocation } from "react-router-dom";

const sidebarItems = [
  { label: "Galeria", icon: PhotoIcon, href: "/gallery" },
  { label: "Favoritos", icon: StarIcon, href: "/favorites" },
];

const sidebarCategories = [
  {
    label: "Kubo | Gerenciamento de estoque",
    href: "/category",
    color: "indigo",
  },
  { label: "Ideias de interface", href: "/category", color: "green" },
  { label: "Importante", href: "/category", color: "red" },
  { label: "Papeis de parede", href: "/category", color: "amber" },
];

export function Sidebar() {
  const location = useLocation();

  return (
    <SidebarComponent.Root>
      <SidebarComponent.Perfil username="Euuryannn"/>
      <div className="flex flex-col gap-px">
        {sidebarItems.map((item, index) => {
          const IconName = item.icon;

          return (
            <SidebarComponent.Item
              href={item.href}
              key={index}
              className={`${
                location.pathname === item.href && "bg-foreground/10"
              }`}
            >
              <div className="flex items-center gap-2">
                <IconName className="size-4 fill-foreground/60" />
                {item.label}
              </div>
              <div>
                <span className="text-xs text-foreground/50">30</span>
              </div>
            </SidebarComponent.Item>
          );
        })}
      </div>
      <div className="flex flex-col gap-4 px-3">
        <div className="font-medium text-sm">Minhas categorias</div>
        <div className="flex flex-col gap-3">
          {sidebarCategories.map((item, index) => {
            return (
              <SidebarComponent.Category key={index} href={item.href}>
                <div className="flex items-center gap-2">
                  <div
                    data-color={item.color}
                    className="size-2.5 rounded-full"
                  />
                  <span className="truncate text-ellipsis max-w-36">
                    {item.label}
                  </span>
                </div>
                <div>
                  <span className="text-xs text-foreground/50">8</span>
                </div>
              </SidebarComponent.Category>
            );
          })}
        </div>
      </div>
    </SidebarComponent.Root>
  );
}
