import {
  ArrowUturnLeftIcon,
  ChevronUpDownIcon,
  CodeBracketIcon,
  Cog6ToothIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/16/solid";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
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

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="w-full">
        <div className="flex items-center justify-between px-3 py-2.5 rounded-lg bg-foreground/5 cursor-default hover:bg-foreground/10 transition-colors">
          <div className="flex items-center gap-2">
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt=""
                className="w-7 rounded-full"
              />
            ) : (
              <div className="size-6 rounded-full bg-foreground/10 flex items-center justify-center">
                {firstLetter}
              </div>
            )}
            <span className="font-medium text-sm truncate text-ellipsis max-w-36">
              {fullName}
            </span>
          </div>
          <div>
            <ChevronUpDownIcon className="size-4 fill-foreground/50" />
          </div>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="start">
        <DropdownMenuLabel>Minha conta</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Cog6ToothIcon />
          Configurações
        </DropdownMenuItem>
        <DropdownMenuItem>
          <PaperAirplaneIcon />
          Feedback
        </DropdownMenuItem>
        <DropdownMenuItem>
          <CodeBracketIcon />
          GitHub
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleLogout}>
          <ArrowUturnLeftIcon />
          Sair
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
