// @ts-check
import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import icon from "astro-icon";
import netlify from "@astrojs/netlify";

// https://astro.build/config
export default defineConfig({
  site: "http://majicwebdesign.netlify.app",
  integrations: [tailwind(), icon()],
  vite: {
    build: {
      sourcemap: true,
    },
  },
  adapter: netlify(),
});
