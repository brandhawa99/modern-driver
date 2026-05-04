import { defineConfig } from "vite";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import babel from "@rolldown/plugin-babel";
import tailwindcss from "@tailwindcss/vite";
import path from "node:path";
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    VitePWA({
      manifest: {
        name: "Modern Driver",
        short_name: "ModernDriver",
        description: "Car News and Auction App v0.1.0",
        display: "standalone",
        icons: [
          {
            src: "logo.svg",
            type: "image/svg",
          },
        ],
      },
      registerType: "autoUpdate",
      injectRegister: "auto",
      workbox: {
        runtimeCaching: [
          {
            urlPattern: ({ url }) => url.hostname === "flagsapi.com",
            handler: "CacheFirst",
            options: {
              cacheName: "country-flags",
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60 * 24 * 30,
              },
            },
          },
        ],
      },
    }),
    tanstackRouter({
      target: "react",
      autoCodeSplitting: true,
    }),
    react(),
    babel({ presets: [reactCompilerPreset()] }),
    tailwindcss(),
  ],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
