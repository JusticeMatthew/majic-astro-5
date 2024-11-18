import defaultTheme from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  blocklist: ["container"],
  important: true,
  experimental: {
    optimizeUniversalDefaults: true,
  },
  theme: {
    extend: {
      screens: {
        tablet: "1025px",
        container: "1400px",
      },
      margin: {
        section: "var(--space-section)",
      },
      fontSize: {
        min: "var(--step-00)",
        content: "var(--step-0)",
        "level-1": "var(--step-1)",
        "level-2": "var(--step-2)",
        "level-3": "var(--step-3)",
        "level-4": "var(--step-4)",
        "level-5": "var(--step-5)",
        "level-6": "var(--step-6)",
      },
      fontFamily: {
        inter: ["Inter", ...defaultTheme.fontFamily.sans],
        calistoga: ["Calistoga", ...defaultTheme.fontFamily.serif],
      },
      colors: {
        blurple: "#6287FF",
        "light-gray": "#E8EAEF",
        "light-purple": "#bbbbff",
        "dark-purple": "#20204e",
        light: "#F8FAFC",
        dark: "#0D111C",
        "dark-bg": "#231731",
      },
      backgroundImage: {
        "primary-gradient": "linear-gradient(to right, #735CDD, #00A7E1)",
        "secondary-gradient": "linear-gradient(to right, #6732c2, #4d76d6)",
        "parallax-gradient":
          "linear-gradient(to right, #735CDD, #00A7E1, #735CDD)",
      },
    },
  },
  plugins: [],
};
