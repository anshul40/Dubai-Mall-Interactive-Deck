import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#050505",
        mist: "#f4f2ee",
        gold: "#c9a962",
        line: "rgba(255,255,255,0.08)",
      },
      fontFamily: {
        display: [
          "ui-serif",
          "Georgia",
          "Cambria",
          "Times New Roman",
          "Times",
          "serif",
        ],
        sans: [
          "Inter",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "sans-serif",
        ],
      },
      fontSize: {
        /** Mobile-first clamp so long headlines wrap without forcing horizontal scroll */
        "display-xl": ["clamp(1.75rem,4.2vw + 0.85rem,5.5rem)", { lineHeight: "0.98" }],
        "display-lg": ["clamp(1.65rem,3.2vw + 0.75rem,3.5rem)", { lineHeight: "1.02" }],
      },
      spacing: {
        18: "4.5rem",
        22: "5.5rem",
      },
      backdropBlur: {
        xs: "2px",
      },
      animation: {
        shimmer: "shimmer 2.2s ease-in-out infinite",
        grain: "grain 8s steps(10) infinite",
        heroSpec: "heroSpec 5.5s ease-in-out infinite",
        scrollCue: "scrollCue 2.1s ease-in-out infinite alternate",
        scrollCueLabel: "scrollCueLabel 2.4s ease-in-out infinite alternate",
      },
      keyframes: {
        shimmer: {
          "0%": { opacity: "0.35" },
          "50%": { opacity: "0.85" },
          "100%": { opacity: "0.35" },
        },
        grain: {
          "0%, 100%": { transform: "translate(0,0)" },
          "10%": { transform: "translate(-5%,-10%)" },
          "30%": { transform: "translate(7%,-25%)" },
          "50%": { transform: "translate(-15%,10%)" },
          "70%": { transform: "translate(0%,15%)" },
          "90%": { transform: "translate(-10%,10%)" },
        },
        heroSpec: {
          "0%, 100%": { opacity: "0.12", transform: "translateY(0)" },
          "50%": { opacity: "0.5", transform: "translateY(-10px)" },
        },
        scrollCue: {
          "0%": { transform: "translateY(0)", opacity: "1" },
          "100%": { transform: "translateY(10px)", opacity: "0.35" },
        },
        scrollCueLabel: {
          "0%": { opacity: "0.55", transform: "translateY(0)" },
          "100%": { opacity: "1", transform: "translateY(3px)" },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
