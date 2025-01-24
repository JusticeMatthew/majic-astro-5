// @ts-check
import { defineConfig, envField } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import solidJs from "@astrojs/solid-js";
import netlify from "@astrojs/netlify";
import sitemap from "@astrojs/sitemap";
import icon from "astro-icon";
import ui from "@studiocms/ui";

// https://astro.build/config
export default defineConfig({
  site: "http://majicwebdesign.netlify.app",
  integrations: [icon(), solidJs(), sitemap(), ui()],
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
  adapter: netlify(),
  experimental: {
    svg: true,
  },
});
