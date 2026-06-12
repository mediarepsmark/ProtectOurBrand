import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#08213a",
        midnight: "#eff6ff",
        panel: "#ffffff",
        cyan: "#0891b2",
        blue: "#075985",
        amber: "#d97706",
        slateLine: "rgba(15, 31, 54, 0.14)"
      },
      boxShadow: {
        glow: "0 18px 50px rgba(8, 145, 178, 0.16)"
      },
      backgroundImage: {
        grid: "linear-gradient(rgba(8,33,58,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(8,33,58,0.06) 1px, transparent 1px)"
      }
    }
  },
  plugins: []
};

export default config;
