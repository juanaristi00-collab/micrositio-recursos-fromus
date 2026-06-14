import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        // Identidad Fromus — terminal dark-mode
        base: "#000000",
        surface: {
          DEFAULT: "#050505",
          raised: "#0F0F0F",
        },
        edge: "#1A1A1A",
        orange: "#E8672E", // sagrado — solo CTAs y acentos
        beige: "#E8E0D0",
        emerald: "#10B981",
        indigo: "#6366F1",
      },
      fontFamily: {
        display: ["var(--font-dela)", "system-ui", "sans-serif"],
        body: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains)", "ui-monospace", "monospace"],
        hand: ["var(--font-caveat)", "cursive"],
      },
      keyframes: {
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        blink: {
          "0%, 49%": { opacity: "1" },
          "50%, 100%": { opacity: "0" },
        },
      },
      animation: {
        "fade-in-up": "fade-in-up 0.4s ease-out both",
        blink: "blink 1.1s step-end infinite",
      },
    },
  },
  plugins: [],
};

export default config;
