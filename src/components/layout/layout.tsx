import { Outlet } from "react-router-dom";
import { Sidebar } from "./sidebar/sidebar";

export function Layout() {
  return (
    <div className="flex h-screen w-full">
      <Sidebar />
      <main className="w-full p-5 md:p-7 flex flex-col gap-10 max-h-screen overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
