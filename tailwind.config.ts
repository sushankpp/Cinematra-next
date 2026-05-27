import type { Config } from "tailwindcss";

export default {
  theme: {
    container: {
      center: true,
      padding: "1rem",
      screens: {
        sm: "880px",
        md: "1080px",
        lg: "1280px",
        xl: "1440px",
      },
    },
    extend: {
      maxWidth: {
        sm: "880px",
        md: "1080px",
        lg: "1330px",
        xl: "1440px",
      },
      fontFamily: {
        // Primary fonts for the new theme
        headline: ["Playfair Display", "serif"],
        body: ["Hanken Grotesk", "sans-serif"],
      },
      colors: {
        primary: {
          text: "#F5EEE8",
          active: "#e50914",
        },
        secondary: {
          DEFAULT: "#FFB800",
          Body: "#131314",
        },
        tertiary: {
          DEFAULT: "#0F172A",
          Shade: "#6B7280",
        },
        neutral: {
          DEFAULT: "#0A0A0B",
          Shade: "#0e0e0f",
        },
        red: {
          500: "#E50914",
          text: "#E8B4A8",
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
