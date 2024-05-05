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
        primary: '#586FB5',
        secondary: '',
        tertiary:'#66C61C',
        quaternary:'#F79009',
        quinary:'#D7D3D0',
        senary:'#A8B9EE',
        septenary:'#E2E8F9',
        octonary:'#E7E5E4',
        nonary:'#FDFDFC',
        denary:'',
      }
    },
  },
  plugins: [],
};
