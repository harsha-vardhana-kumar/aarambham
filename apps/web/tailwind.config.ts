import type { Config } from "tailwindcss";
export default {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "../../packages/ui/src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: "var(--color-brand-primary)",
        accent: "var(--color-brand-accent)",
        ink: "var(--color-text-primary)",
        paper: "var(--color-background-subtle)",
      },
    },
  },
  plugins: [],
} satisfies Config;
