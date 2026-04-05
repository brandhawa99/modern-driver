import { MoonIcon, SunIcon } from "@phosphor-icons/react";
import { Button } from "./ui/button";
import { useThemeStore } from "@/store/themeStore";

export default function ThemeSelector() {
  const theme = useThemeStore((state) => state.theme);
  const setTheme = useThemeStore((state) => state.setTheme);
  return (
    <Button asChild variant="ghost" className="rounded-full w-12 h-12">
      {theme === "light" ? (
        <MoonIcon
          size={48}
          className="transition-all duration-300 hover:scale-110 hover:rotate-12 cursor-pointer"
          onClick={() => setTheme("dark")}
        />
      ) : (
        <SunIcon
          size={48}
          className="transition-all duration-300 hover:scale-110 hover:rotate-45 cursor-pointer"
          onClick={() => setTheme("light")}
        />
      )}
    </Button>
  )
}
