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

interface SidebarPerfilProps {
  avatarUrl?: string;
  username: string;
}

export function SidebarPerfil({ avatarUrl, username }: SidebarPerfilProps) {
  const navigate = useNavigate();

  async function handleLogout() {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error("Falha ao realizar o Logout:", error.message);
    } else {
      console.log("Logout bem-sucedido!");
      navigate("/auth");
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="w-full">
        <div className="flex items-center justify-between px-3 py-2.5 rounded-lg bg-foreground/5 cursor-default hover:bg-foreground/10 transition-colors">
          <div className="flex items-center gap-2">
            {avatarUrl ? (
              <img src={avatarUrl} alt="" className="w-7 rounded-full" />
            ) : (
              <div className="size-6 rounded-full bg-gradient-to-br from-orange-400 to-amber-400" />
            )}
            <span className="font-medium text-sm truncate text-ellipsis max-w-36">
              {username}
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
