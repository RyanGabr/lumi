import { Folders, Inbox, Star, Trash2 } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const tabBarItems = [
  { label: "Página inicial", icon: Inbox, href: "/home" },
  { label: "Coleções", icon: Folders, href: "/collections" },
  { label: "Favoritos", icon: Star, href: "/favorite" },
  { label: "Lixeira", icon: Trash2, href: "/trash" },
];

export function TabBar() {
  const location = useLocation();

  return (
    <div className="fixed bottom-0 w-full h-16 bg-background border-t z-50">
      <div className="flex items-center justify-center gap-20 w-full h-full px-10 text-foreground/80">
        {tabBarItems.map((item) => {
          const IconName = item.icon;

          return (
            <Link to={item.href}>
              <IconName
                strokeWidth={1.5}
                className={`size-6 ${
                  location.pathname === item.href
                    ? "text-foreground"
                    : "text-ring"
                }`}
              />
            </Link>
          );
        })}
      </div>
    </div>
  );
}
