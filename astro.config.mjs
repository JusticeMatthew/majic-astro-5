// @ts-check
import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import icon from "astro-icon";
import netlify from "@astrojs/netlify";
import solidJs from "@astrojs/solid-js";

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "http://majicwebdesign.netlify.app",
  integrations: [tailwind(), icon(), solidJs(), sitemap()],
  vite: {
    build: {
      sourcemap: true,
    },
  },
  adapter: netlify(),
});