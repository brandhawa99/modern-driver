// src/stores/theme-store.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

type Theme = "light" | "dark" | "system";

interface ThemeState {
  theme: Theme;
  resolvedTheme: "light" | "dark";
  setTheme: (theme: Theme) => void;
  applyTheme: () => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      theme: "system",
      resolvedTheme: "light",

      setTheme: (theme) => {
        set({ theme });
        get().applyTheme();
      },

      applyTheme: () => {
        const root = document.documentElement;
        const theme = get().theme;

        const systemDark = window.matchMedia(
          "(prefers-color-scheme: dark)",
        ).matches;

        const resolved =
          theme === "system" ? (systemDark ? "dark" : "light") : theme;

        // minimal DOM mutation
        root.classList.toggle("dark", resolved === "dark");

        set({ resolvedTheme: resolved });
      },
    }),
    {
      name: "theme-storage",
    },
  ),
);
