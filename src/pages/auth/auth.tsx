import { GoogleIcon } from "@/components/auth/google-icon";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";
import { useAuthRedirect } from "@/hooks/use-auth-redirect";
import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";

// Mudanças feitas => Alterei o tamanho da logo (apagar isso quando for commitar)

export function Auth() {
  useAuthRedirect();

  useEffect(() => {
    document.title = "Autenticação | Lumi";
  }, []);

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleGoogleSignIn = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: "http://lumi-blush.vercel.app/home",
      },
    });

    if (error) {
      console.error("Erro de autenticação:", error.message);
      setErrorMessage("Não foi possível conectar com sua conta.");
    } else {
      setErrorMessage(null);
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-center p-10 sm:p-0">
      <div className="flex flex-col items-center gap-7 w-96">
        <Logo className="size-16" />
        <div className="text-center space-y-2">
          <h3 className="font-bold text-2xl tracking-tight">
            Bem-vindo ao Lumi
          </h3>
          <h3 className="font-medium text-foreground/50 text-sm">
            Organize e mantenha suas imagens sempre acessíveis
          </h3>
        </div>
        <div className="flex flex-col gap-3 w-full">
          <Button
            variant="outline"
            onClick={handleGoogleSignIn}
            className="text-sm rounded-sm dark:bg-transparent"
            size="lg"
          >
            <GoogleIcon className="size-4" />
            Conectar com Google
          </Button>
          {errorMessage && (
            <span className="font-medium text-sm text-red-400">
              {errorMessage}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
