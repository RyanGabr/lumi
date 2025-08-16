import { Navigate, Outlet } from "react-router-dom";
import { useUser, useSessionContext } from "@supabase/auth-helpers-react";

export function ProtectedRoute() {
  const { isLoading } = useSessionContext();
  const user = useUser();

  if (isLoading) {
    return null;
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  return <Outlet />;
}