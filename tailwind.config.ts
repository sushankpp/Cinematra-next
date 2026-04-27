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
          600: "#1E1B2E",
          800: "#2D2B3D",
          900: "#0f0f0f",
        },
        blue: {
          50: "#3d3a50",
          100: "#7c5cbf",
          150: "#2d2b3d",
          200: "#322f45"
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
