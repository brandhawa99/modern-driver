import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import "../index.css";
import Header from "@/components/Header";

const RootLayout = () => {
  return (
    <div className="antialiasing bg-[--background] text-[--text] min-h-screen flex flex-col">
      <Header />
      <Outlet />
      <TanStackRouterDevtools />
    </div>
  );
};

export const Route = createRootRoute({ component: RootLayout });
