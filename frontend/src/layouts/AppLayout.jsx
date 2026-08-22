import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

export default function AppLayout() {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-paper">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-5xl px-8 py-10 animate-fade-up">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
