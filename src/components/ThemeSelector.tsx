import { MoonIcon, SunIcon } from "@phosphor-icons/react";
import { Button } from "./ui/button";
import { useThemeStore } from "@/store/themeStore";

export default function ThemeSelector() {
  const theme = useThemeStore((state) => state.theme);
  const setTheme = useThemeStore((state) => state.setTheme);
  if (theme == "light") {
    return (
      <Button
        asChild
        variant="ghost"
        className="hover:border-black transition-border transition-duration-800"
        onClick={() => setTheme("dark")}
      >
        <MoonIcon size="48" />
      </Button>
    );
  } else
    return (
      <Button
        asChild
        variant="ghost"
        className="hover:border-black transition-border transition-duration-800"
        onClick={() => setTheme("light")}
      >
        <SunIcon size="48" />
      </Button>
    );
}
