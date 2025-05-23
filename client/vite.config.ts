import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react-swc"
import { VitePWA } from "vite-plugin-pwa"
import { defineConfig, type Plugin } from "vite"

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.ico", "apple-touch-icon.png", "mask-icon.svg"],
      strategies: "injectManifest",
      srcDir: "src",
      filename: "sw.ts",
      injectRegister: "auto",
      workbox: {
        globPatterns: [
          "**/*.{js,css,html,ico,png,webp,svg,woff,woff2,ttf,eot}",
        ],
        cleanupOutdatedCaches: true,
        sourcemap: true,
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: "CacheFirst",
            options: {
              cacheName: "google-fonts-cache",
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365, // 1 year
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
            handler: "CacheFirst",
            options: {
              cacheName: "google-fonts-assets-cache",
              expiration: {
                maxEntries: 30,
                maxAgeSeconds: 60 * 60 * 24 * 365, // 1 year
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
          {
            urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp)$/i,
            handler: "CacheFirst",
            options: {
              cacheName: "images-cache",
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24 * 30, // 30 days
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
          {
            urlPattern: /^https:\/\/oddly\.netlify\.app\/.*/i,
            handler: "NetworkFirst",
            options: {
              cacheName: "api-cache",
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60 * 24 * 7, // 7 days
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
              networkTimeoutSeconds: 10,
            },
          },
        ],
      },
      manifest: {
        name: "Oddly - Random Number Generator",
        short_name: "Oddly",
        description:
          "A modern, interactive random number generator for lotteries, raffles, and games.",
        theme_color: "#ffffff",
        background_color: "#ffffff",
        display: "standalone",
        orientation: "portrait",
        start_url: "/",
        scope: "/",
        lang: "en",
        categories: ["utilities", "productivity", "games"],
        icons: [
          {
            src: "pwa-64x64.png",
            sizes: "64x64",
            type: "image/png",
          },
          {
            src: "pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "maskable-icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
        screenshots: [
          {
            src: "screenshots/oddly-desktop.png",
            sizes: "1280x720",
            type: "image/png",
            label: "Oddly Random Number Generator - Desktop View",
          },
          {
            src: "screenshots/oddly-mobile.png",
            sizes: "750x1334",
            type: "image/png",
            label: "Oddly Random Number Generator - Mobile View",
          },
        ],
        shortcuts: [
          {
            name: "Generate Numbers",
            short_name: "Generate",
            description: "Generate a new set of random numbers",
            url: "/",
          },
        ],
      },
    }) as unknown as Plugin,
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
