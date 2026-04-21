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
      colors: {
        brand: {
          50: "#f5f7ff",
          100: "#e0e7ff",
          500: "#4f6ef7",
          600: "#3451d1",
          900: "#1a2a6c",
        },
        cream: {
          50: "#F5ECD7",
          100: "#FAF3E0",
        },
        gold: {
          50: "#fff8e7",
          100: "#ffedb3",
          500: "#f5c518",
          600: "#d4a800",
        },
        charcoal: {
          50: "#f5f5f5",
          100: "#e0e0e0",
          500: "#4a4a4a",
          800: "#1f1f1f",
          900: "#0f0f0f",
        },
        red: {
          50: "#ffe5e5",
          100: "#ffb3b3",
          500: "#e50914",
          600: "#b8070f",
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
