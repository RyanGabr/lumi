import { ChevronDownIcon } from "@heroicons/react/16/solid";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { useUser, type User } from "@supabase/auth-helpers-react";
import { Github, LogOut, Presentation, Send, Settings } from "lucide-react";

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
                className="size-5.5 rounded-sm"
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
      <DropdownMenuContent align="start" className="p-0 border-border/50 min-w-72">
        {/* Dropdown Perfil Details */}
        <div className="flex items-center gap-3 p-3 cursor-default select-none">
          <img
            src={avatarUrl}
            alt="User profile picture"
            className="w-8.5 rounded-sm"
          />
          <div>
            <h3 className="text-sm font-semibold">{fullName}</h3>
            <p className="text-xs font-medium text-foreground/50">{email}</p>
          </div>
        </div>

        <DropdownMenuGroup className="p-1.5 border-t text-foreground/50 font-medium">
          <DropdownMenuItem>
            <Settings /> Configurações
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Send />
            Feedback
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Github />
            GitHub
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Presentation />
            Landing Page
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuGroup className="p-1.5 border-t text-foreground/60">
          <DropdownMenuItem onClick={handleLogout}>
            <LogOut />
            Sair
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
