import { Outlet } from "react-router-dom";

export function Layout() {
  return (
    <div className="flex h-screen w-full">
      <div>Sidebar</div>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
