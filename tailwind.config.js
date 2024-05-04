/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primary: {
          DEFAULT: "#586FB5",
          50: "#E2E8F9",
          200: "#A8B9EE"
        },
        "bg-light": "#FFFFFF",
        "text-light": "#FDFDFC",
        "text-dark": "#000000",
        "success": "#66C61C",
        "warning": "#F79009",
        "fill-heart": "#E31B54",
        "neutral": "#D7D3D0",
      }
    },
  },
  plugins: [],
};
