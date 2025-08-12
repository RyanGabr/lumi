import { RouterProvider } from "react-router-dom";
import { ThemeProvider } from "./components/ui/theme-provider";
import { routes } from "./routes/routes";
import { supabase } from "./lib/supabase";
import { SessionContextProvider } from "@supabase/auth-helpers-react";

export function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <SessionContextProvider supabaseClient={supabase}>
        <RouterProvider router={routes} />
      </SessionContextProvider>
    </ThemeProvider>
  );
}
