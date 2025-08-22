import { Outlet } from "react-router-dom";
import { Sidebar } from "./sidebar/sidebar";
import { LoadingSidebar } from "./sidebar/loading-sidebar";
import { Suspense } from "react";
import { CategorySheetProvider } from "@/context/category-sheet-context";

export function Layout() {
  return (
    <div className="flex h-screen w-full">
      <Suspense fallback={<LoadingSidebar />}>
        <CategorySheetProvider>
          <Sidebar />
        </CategorySheetProvider>
      </Suspense>
      <main className="w-full p-5 md:p-7 md:px-10 flex flex-col gap-10 max-h-screen overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
