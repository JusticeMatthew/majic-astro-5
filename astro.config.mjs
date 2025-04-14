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
  experimental: {
    svg: true,
  },
  adapter: vercel(),
});
