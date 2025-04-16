// @ts-check
import { defineConfig, envField } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import solidJs from "@astrojs/solid-js";
import sitemap from "@astrojs/sitemap";
import vercel from "@astrojs/vercel";
import ui from "@studiocms/ui";

// https://astro.build/config
export default defineConfig({
  site: "http://majicwebdesign.vercel.app",
  integrations: [
    solidJs(),
    sitemap(),
    ui({
      noInjectCSS: true,
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
  env: {
    schema: {
      RESEND_API_KEY: envField.string({ context: "server", access: "secret" }),
    },
  },
  adapter: vercel(),
  experimental: {
    fonts: [
      {
        provider: "local",
        name: "Calistoga",
        cssVariable: "--astro-calistoga",
        fallbacks: ["Calistoga"],
        variants: [
          {
            weight: 400,
            style: "normal",
            display: "swap",
            src: ["./src/assets/fonts/Calistoga.woff2"],
          },
        ],
      },
      {
        provider: "local",
        name: "Inter",
        cssVariable: "--astro-inter",
        fallbacks: ["Inter"],
        variants: [
          {
            weight: "400 900",
            style: "normal",
            display: "swap",
            src: ["./src/assets/fonts/Inter.woff2"],
          },
        ],
      },
    ],
  },
});
