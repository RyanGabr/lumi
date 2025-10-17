import { useUser } from "@supabase/auth-helpers-react";

export function Hero() {
  const user = useUser();
  const username = user?.user_metadata.name;

  function getGreeting() {
    const hours = new Date().getHours();
    if (hours >= 5 && hours < 12) return "Bom dia";
    if (hours >= 12 && hours < 18) return "Boa tarde";
    return "Boa noite";
  }

  const userFirstName = username.split(" ")[0];
  const userLastName = username.split(" ")[1] ?? "";

  return (
    <div className="w-full flex items-center justify-center gap-6 h-32">
      <div className="flex items-center gap-2">
        <h1 className="font-bold text-3xl text-foreground/90 tracking-tight">
          {getGreeting()}, {userFirstName} {userLastName}
        </h1>
      </div>
    </div>
  );
}
