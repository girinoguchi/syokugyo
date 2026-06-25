import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        telecareer: {
          yellow: "var(--color-yellow)",
          orange: "var(--color-orange)",
          green: "var(--color-green)",
          coral: "var(--color-coral)",
          "bg-dark": "var(--color-bg-dark)",
          offwhite: "var(--color-bg-offwhite)",
          header: "var(--color-bg-offwhite)",
          footer: "var(--telecareer-footer)",
          card: "#ffffff",
          accent: "var(--color-yellow)",
          "accent-hover": "var(--color-orange)",
          dark: "var(--color-bg-dark)",
          "text-on-dark": "var(--color-text-on-dark)",
          "text-on-light": "var(--color-text-on-light)",
          "orange-a11y": "var(--color-orange-accessible)",
          "coral-a11y": "var(--color-coral-accessible)",
          "green-a11y": "var(--color-green-accessible)",
          ink: "var(--color-ink)",
        },
        accent: {
          navy: "var(--color-bg-dark)",
          "navy-light": "#2d2d32",
        },
      },
      fontFamily: {
        sans: [
          "Hiragino Kaku Gothic ProN",
          "Hiragino Sans",
          "Meiryo",
          "sans-serif",
        ],
      },
      backgroundImage: {
        "tc-cta": "linear-gradient(135deg, var(--color-yellow) 0%, var(--color-orange) 100%)",
        "tc-heading-line":
          "linear-gradient(to right, var(--color-yellow), var(--color-orange))",
      },
    },
  },
  plugins: [],
};
export default config;
