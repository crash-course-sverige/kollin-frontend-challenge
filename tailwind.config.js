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
      animation: {
        heartbeat: "heartbeat 1s ease-in-out",
      },
      keyframes: {
        heartbeat: {
          "0%": { transform: "scale(1)", filter: "brightness(100%)" },
          "50%": { transform: "scale(1.5)", filter: "brightness(30%)" },
          "100%": { transform: "scale(1)", filter: "brightness(100%)" },
        },
      },
    },
  },
  plugins: [],
};
