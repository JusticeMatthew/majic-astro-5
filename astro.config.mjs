// @ts-check
import { defineConfig, envField } from "astro/config";
import tailwind from "@astrojs/tailwind";
import netlify from "@astrojs/netlify";
import solidJs from "@astrojs/solid-js";
import sitemap from "@astrojs/sitemap";
import icon from "astro-icon";

// https://astro.build/config
export default defineConfig({
  site: "http://majicwebdesign.netlify.app",
  integrations: [tailwind(), icon(), solidJs(), sitemap()],
  build: {
    inlineStylesheets: "always",
  },
  env: {
    schema: {
      RESEND_API_KEY: envField.string({ context: "server", access: "secret" }),
    },
  },
  adapter: netlify(),
});
