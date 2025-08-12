import { GoogleIcon } from "@/components/auth/google-icon";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useAuthRedirect } from "@/hooks/use-auth-redirect";
import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";

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
        redirectTo: "http://localhost:5173/gallery",
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
      <div className="flex flex-col gap-7 w-96">
        <span>LOGO</span>
        <div className="space-y-2">
          <h3 className="font-semibold text-2xl">Bem-vindo ao Lumi</h3>
          <p className="text-sm text-foreground/50">
            Um espaço para guardar, organizar e valorizar suas imagens.
          </p>
        </div>
        <Separator />
        <div className="flex flex-col gap-3">
          <Button
            onClick={handleGoogleSignIn}
            className="text-sm bg-foreground/5 text-foreground border border-border hover:bg-foreground/10"
            size="lg"
          >
            <GoogleIcon />
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
