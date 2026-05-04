import CarsSection from "@/components/HomePage/CarsSection";
import CTA from "@/components/HomePage/CTA";
import FeaturedArticles from "@/components/HomePage/FeaturedArticles";
import Hero from "@/components/HomePage/Hero";
import { useThemeStore } from "@/store/themeStore";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const applyTheme = useThemeStore((s) => s.applyTheme)

  useEffect(() => {
    applyTheme();
  }, [])

  return (
    <div className="min-h-[calc(100vh-80px)] mx-2 md:mx-8">
      <Hero />
      <FeaturedArticles />
      <CarsSection />
      <CTA />
    </div>
  );
}
