import { MoonIcon, SunIcon } from "@phosphor-icons/react";
import { Button } from "./ui/button";
import { useThemeStore } from "@/store/themeStore";

export default function ThemeSelector() {
  const theme = useThemeStore((state) => state.theme);
  const setTheme = useThemeStore((state) => state.setTheme);
  const themeIconStyle = "transition-all duration-300 hover:scale-110 hover:rotate-12 cursor-pointer"
  const themeButtonSize = { width: 24, height: 24 }
  return (
    <Button variant="ghost" className="rounded-full w-12 h-12"
      onClick={() =>
        setTheme(theme == "light" ? "dark" : "light")
      }
    >
      {theme === "light" ? (
        <MoonIcon
          className={themeIconStyle}
          style={themeButtonSize}
        />
      ) : (
        <SunIcon
          style={themeButtonSize}
          className={themeIconStyle}
        />
      )}
    </Button >
  );
}
