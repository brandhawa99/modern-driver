import CarsSection from "@/components/HomePage/CarsSection";
import CTA from "@/components/HomePage/CTA";
import FeaturedArticles from "@/components/HomePage/FeaturedArticles";
import Hero from "@/components/HomePage/Hero";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="min-h-[calc(100vh-80px)] mx-2 md:mx-8">
      <Hero />
      <FeaturedArticles />
      <CarsSection />
      <CTA />
    </div>
  );
}
