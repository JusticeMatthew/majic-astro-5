// @ts-check
import { defineConfig, envField } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import solidJs from "@astrojs/solid-js";
import sitemap from "@astrojs/sitemap";
import icon from "astro-icon";
import ui from "@studiocms/ui";
import vercel from "@astrojs/vercel";

// https://astro.build/config
export default defineConfig({
  site: "http://majicwebdesign.vercel.app",
  integrations: [
    icon(),
    solidJs(),
    sitemap(),
    ui({
      noInjectCSS: true,
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
  build: {
    inlineStylesheets: "always",
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
