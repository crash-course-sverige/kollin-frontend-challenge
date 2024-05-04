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
        GREEN: "#66C61C",
        ORANGE: "#F79009",
        BLUE: "#A8B9EE",
        DARK_BLUE: "#586FB5",
        LIGHT_BLUE: "#E2E8F9",

        GREY: "#D7D3D0",
      },
      fontFamily: {
        crimson: ["Crimson Text", "serif"],
      },
    },
  },
  plugins: [],
};
