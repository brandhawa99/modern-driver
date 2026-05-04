import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import "../index.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const RootLayout = () => {
  return (
    <div className="antialiasing bg-[--background] text-[--text] min-h-screen flex flex-col">
      <Header />
      <Outlet />
      {/* <TanStackRouterDevtools /> */}
      <Footer />
    </div>
  );
};

export const Route = createRootRoute({ component: RootLayout });
