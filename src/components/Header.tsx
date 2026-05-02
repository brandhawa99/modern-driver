import { CarIcon, GarageIcon, GavelIcon } from "@phosphor-icons/react";
import { Link } from "@tanstack/react-router";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import ThemeSelector from "./ThemeSelector";

const headerLinks = [
  { name: "Showroom", to: "/showroom", icon: CarIcon },
  { name: "Auction", to: "/auction", icon: GavelIcon },
  { name: "Garage", to: "/garage", icon: GarageIcon },
];

export default function Header() {
  return (
    <header className="bg-[--background]">
      <nav className="flex items-center justify-between py-4 px-2 md:px-8">
        <Link to="/">
          <h1 className="font-bold bg-[--accent] text-[18px] md:text-2xl">
            MODERN DRIVER
          </h1>
        </Link>
        <div className="flex  items-center justify-center md:gap-2">
          {headerLinks.map((link) => {
            const Icon = link.icon;
            return (
              <Button
                key={link.name}
                asChild
                variant="ghost"
                className="px-4 py-3 hover:border-black transition-border transition-duration-800"
              >
                <Link to={link.to} className="flex items-center gap-2">
                  {({ isActive }) => (
                    <>
                      <Icon
                        weight={`${isActive ? "fill" : "regular"}`}
                        className="md:w-6! md:h-6! shrink-0"
                      />
                      <span
                        className={cn(
                          "hidden sm:inline",
                          isActive && "font-bold",
                        )}
                      >
                        {link.name}
                      </span>
                    </>
                  )}
                </Link>
              </Button>
            );
          })}
          <ThemeSelector />
        </div>
      </nav>
    </header>
  );
}
