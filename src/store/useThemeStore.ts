import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface ThemeState {
  theme: 'light' | 'dark'
  toggleTheme: () => void
  applyThemePreference: () => void
}

export const useThemeStore = create<
  ThemeState,
  [['zustand/persist', ThemeState]]
>(
  persist(
    (set, get) => ({
      theme: 'light',
      toggleTheme: () => {
        set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' }))
        get().applyThemePreference()
      },
      applyThemePreference: () => {
        const currentTheme = get().theme
        if (currentTheme === 'dark') {
          document.documentElement.classList.add('dark')
        } else {
          document.documentElement.classList.remove('dark')
        }
      },
    }),
    {
      name: 'theme-store',
      storage: createJSONStorage(() => localStorage),
    },
  ),
)
