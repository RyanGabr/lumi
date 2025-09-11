import { ChevronDownIcon } from "@heroicons/react/16/solid";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { useUser, type User } from "@supabase/auth-helpers-react";
import {
  ArrowUpRight
} from "lucide-react";

export function SidebarPerfil() {
  const navigate = useNavigate();
  const user: User | null = useUser();

  async function handleLogout() {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error("Falha ao realizar o Logout:", error.message);
    } else {
      console.log("Logout bem-sucedido!");
      navigate("/auth");
    }
  }

  const avatarUrl = user?.user_metadata?.avatar_url;
  const fullName = user?.user_metadata?.full_name || "";
  const firstLetter = fullName.charAt(0).toUpperCase(); // first letter from user full name
  const email = user?.email;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="w-full">
        <div className="flex items-center justify-between px-2.5 py-2 rounded-md cursor-pointer hover:bg-foreground/6 transition-colors">
          <div className="flex items-center gap-2">
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt="User profile picture"
                className="size-6 rounded-full"
              />
            ) : (
              <div className="size-6 rounded-full bg-foreground/10 flex items-center justify-center">
                {firstLetter}
              </div>
            )}
            <span className="font-medium text-sm truncate text-ellipsis max-w-40">
              {fullName}
            </span>
          </div>
          <div>
            <ChevronDownIcon className="size-4.5 fill-foreground/50" />
          </div>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        className="p-0 min-w-64 rounded-lg shadow-2xl shadow-black/30"
      >
        {/* Dropdown Perfil Details */}
        <div className="flex flex-col p-3 cursor-default select-none">
          <h3 className="text-sm font-medium text-foreground/85">{fullName}</h3>
          <p className="text-xs font-medium text-foreground/50">{email}</p>
        </div>
        <DropdownMenuSeparator className="mx-2 my-0" />
        <DropdownMenuGroup className="p-1 text-foreground/85">
          <DropdownMenuItem>Configurações</DropdownMenuItem>
          <DropdownMenuItem>Enviar feedback</DropdownMenuItem>
          <DropdownMenuItem>
            Repositório do projeto <ArrowUpRight />
          </DropdownMenuItem>
          <DropdownMenuItem>
            Landing Page
            <ArrowUpRight />
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator className="mx-2 my-0" />
        <DropdownMenuGroup className="p-1 text-foreground/85">
          <DropdownMenuItem
            onClick={handleLogout}
            className="focus:text-red-400"
          >
            Fazer logout
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
