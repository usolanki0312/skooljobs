// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      injectRegister: "script",
      registerType: "autoUpdate",
      includeAssets: ["**/*.{js,css,html,ico,png,svg,jpg,jpeg,gif,webp}"],
      workbox: {
        // The nsfwjs moderation model weights (~3.5MB) are dynamically
        // imported only when a user actually uploads an image - exclude them
        // from service-worker precaching so every visitor doesn't pay that
        // download upfront. The browser's HTTP cache still serves repeat
        // requests since the chunk filename is content-hashed.
        globIgnores: ["**/group1-shard*.js"],
      },
      manifest: {
        name: "Skool Jobs",
        short_name: "Skool Jobs",
        description: "",
        display: "standalone",
        theme_color: "#575A59",
        background_color: "#ffffff",
        icons: [
          {
            src: "/logo192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/logo512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
        screenshots: [
          {
            src: "/screenshots/mobile-home.png",
            sizes: "1080x1920",
            type: "image/png",
          },
          {
            src: "/screenshots/desktop-home.png",
            sizes: "1920x1080",
            type: "image/png",
            form_factor: "wide",
          },
        ],
      },
    }),
  ],
});
