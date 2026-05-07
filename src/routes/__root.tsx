import { createRootRoute, Outlet } from "@tanstack/react-router";
import "../index.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useThemeStore } from "@/store/themeStore";
import { useEffect } from "react";

const RootLayout = () => {
  const applyTheme = useThemeStore((s) => s.applyTheme);
  useEffect(() => {
    applyTheme();
  }, []);
  return (
    <div className="antialiasing bg-[--background] text-[--text] min-h-screen flex flex-col">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export const Route = createRootRoute({ component: RootLayout });
