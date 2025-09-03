import { useUser } from "@supabase/auth-helpers-react";
import { Logo } from "../ui/logo";

export function GalleryHero() {
  const user = useUser();
  const username = user?.user_metadata.name;

  return (
    <div className="w-full flex flex-col justify-center gap-6 h-44">
      <div className="flex flex-col gap-4">
        <Logo />
        <div className="">
          <h1 className="font-bold text-3xl text-foreground/90 tracking-tight">
            Olá {username.split(" ")[0]}.
          </h1>
          <h1 className="font-bold text-3xl text-foreground/50 tracking-tight">
            Bem-vindo à sua galeria.
          </h1>
        </div>
      </div>
    </div>
  );
}
