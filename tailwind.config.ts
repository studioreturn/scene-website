import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        scene: {
          bg: "#000000",
          surface: "#1C1C1E",
          "surface-2": "#2C2C2E",
          muted: "#8E8E93",
          border: "#0d0d0d",
          separator: "#3A3A3C",
        },
      },
      borderRadius: {
        card: "12px",
        "card-lg": "16px",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
