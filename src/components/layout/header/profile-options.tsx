import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowUpRight, Bolt, Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/ui/theme-provider";
import { useUser, type User } from "@supabase/auth-helpers-react";
import { useNavigate } from "react-router-dom";

export function ProfileOptions() {
  const user: User | null = useUser();
  const avatarUrl = user?.user_metadata.avatar_url;

  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button>
          <img
            src={avatarUrl}
            alt="user profile picture"
            className="rounded-full w-8.5"
          />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        className="w-64 p-2 rounded-lg dark:shadow-black/30 shadow-2xl"
      >
        <DropdownMenuGroup className="flex flex-col p-2">
          <span className="font-medium">
            {user?.user_metadata.name.split(" ")[0]}
          </span>
          <span className="text-sm font-medium text-muted-foreground">
            {user?.email}
          </span>
        </DropdownMenuGroup>

        <ButtonGroup className="p-2 flex w-full divide-x">
          <Button
            data-theme={theme}
            variant="secondary"
            className="flex-1 data-[theme=dark]:bg-foreground/10"
            onClick={() => setTheme("dark")}
          >
            <Moon />
          </Button>
          <Button
            data-theme={theme}
            variant="secondary"
            className="flex-1 data-[theme=light]:bg-foreground/10"
            onClick={() => setTheme("light")}
          >
            <Sun />
          </Button>
          <Button
            data-theme={theme}
            variant="secondary"
            className="flex-1 data-[theme=system]:bg-foreground/10"
            onClick={() => setTheme("system")}
          >
            <Bolt />
          </Button>
        </ButtonGroup>

        <DropdownMenuSeparator className="my-1.5" />

        <DropdownMenuGroup className="text-foreground/85">
          <DropdownMenuItem
            onClick={() => navigate("feedback")}
            className="text-base"
          >
            Enviar feedback
          </DropdownMenuItem>
          <a href="https://github.com/RyanGabr/lumi" target="_blank">
            <DropdownMenuItem className="text-base">
              Repositório do projeto <ArrowUpRight />
            </DropdownMenuItem>
          </a>
          <DropdownMenuItem className="text-base">
            Landing Page
            <ArrowUpRight />
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator className="my-1.5" />

        <DropdownMenuGroup className="text-foreground/85">
          <DropdownMenuItem className="text-base" variant="destructive">
            Fazer logout
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
