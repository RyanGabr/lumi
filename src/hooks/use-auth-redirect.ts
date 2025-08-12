import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSession } from "@supabase/auth-helpers-react";

export function useAuthRedirect() {
  const session = useSession();
  const navigate = useNavigate();

  useEffect(() => {
    if (session?.access_token) {
      navigate('/gallery');
    }
  }, [session, navigate]);
}