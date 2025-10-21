import { Outlet } from "react-router-dom";
import { Sidebar } from "./sidebar/sidebar";
import { LoadingSidebar } from "./sidebar/loading-sidebar";
import { Suspense } from "react";
import { TabBar } from "./tab-bar/tab-bar";
import { Header } from "./header/header";

export function Layout() {
  return (
    <div className="flex h-screen w-full">
      <div className="block lg:hidden">
        <Header />
      </div>

      <div className="hidden lg:block">
        <Suspense fallback={<LoadingSidebar />}>
          <Sidebar />
        </Suspense>
      </div>

      <div className="block lg:hidden">
        <TabBar />
      </div>

      <main className="w-full flex flex-col gap-10 max-h-screen overflow-y-auto pt-6 pb-16 lg:pb-0 lg:pt-0">
        <Outlet />
      </main>
    </div>
  );
}
