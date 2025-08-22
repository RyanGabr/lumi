import { Outlet } from "react-router-dom";
import { Sidebar } from "./sidebar/sidebar";
import { LoadingSidebar } from "./sidebar/loading-sidebar";
import { Suspense } from "react";
import { CategoryPopoverProvider } from "@/context/category-popover-context";

export function Layout() {
  return (
    <div className="flex h-screen w-full">
      <Suspense fallback={<LoadingSidebar />}>
        <CategoryPopoverProvider>
          <Sidebar />
        </CategoryPopoverProvider>
      </Suspense>
      <main className="w-full p-5 md:p-7 md:px-10 flex flex-col gap-10 max-h-screen overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
