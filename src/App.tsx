import { RouterProvider } from "react-router-dom";
import { ThemeProvider } from "./components/ui/theme-provider";
import { routes } from "./routes/routes";
import { supabase } from "./lib/supabase";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/query-client";

export function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <SessionContextProvider supabaseClient={supabase}>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={routes} />
        </QueryClientProvider>
      </SessionContextProvider>
    </ThemeProvider>
  );
}
