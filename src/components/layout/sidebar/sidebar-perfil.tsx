import { ChevronDownIcon } from "@heroicons/react/16/solid";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuGroup
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { useUser, type User } from "@supabase/auth-helpers-react";

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
              <img src={avatarUrl} alt="" className="w-5.5 rounded-full" />
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
      <DropdownMenuContent align="start" className="p-0">
        <div className="flex items-center gap-2 py-3 px-4 cursor-default select-none">
          <img src={avatarUrl} alt="" className="w-7 rounded-full" />
          <div>
            <h3 className="text-sm font-medium">{fullName}</h3>
            <p className="text-xs font-medium text-foreground/50">{email}</p>
          </div>
        </div>
        <DropdownMenuGroup className="bg-background/50 p-1.5 border-t">
          <DropdownMenuItem className="text-foreground/60">
            Configurações
          </DropdownMenuItem>
          <DropdownMenuItem className="text-foreground/60">
            Feedback
          </DropdownMenuItem>
          <DropdownMenuItem className="text-foreground/60">
            GitHub
          </DropdownMenuItem>
          <DropdownMenuItem className="text-foreground/60">
            Landing Page
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuGroup className="bg-background/50 p-1.5 border-t">
          <DropdownMenuItem
            className="text-foreground/60"
            onClick={handleLogout}
          >
            Sair da conta
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
