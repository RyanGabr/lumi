import { Outlet } from "react-router-dom";
import { Sidebar } from "./sidebar/sidebar";

export function Layout() {
  return (
    <div className="flex h-screen w-full">
      <Sidebar />
      <main>
        <Outlet />
      </main>
    </div>
  );
}
