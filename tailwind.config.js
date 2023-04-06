/** @type {import('tailwindcss').Config} */
const { withAnimations } = require('animated-tailwindcss')
export default withAnimations({
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      sans: ["Josefin Sans", "sans-serif"],
    },
    extend: {
      colors: {
        light: "#FFFFFF",
        dark: "#2D2D2D",
        primary: {
          50: "#F2EBE8",
          100: "#E7D9D5",
          200: "#CDB0A8",
          300: "#B48A7E",
          400: "#986758",
          500: "#6D4A3F",
          600: "#573B32",
          700: "#412C25",
          800: "#2A1C18",
          900: "#170F0D",
          950: "#0A0706"
        },
        secondary: {
          50: "#FBFBF8",
          100: "#F8F6F2",
          200: "#EFEBE1",
          300: "#E8E3D4",
          400: "#DFD8C4",
          500: "#D7CFB6",
          600: "#BAAC82",
          700: "#9B8955",
          800: "#665B38",
          900: "#352F1D",
          950: "#1A170E"
        },
      },

      boxShadow: {
        "full": "0 8px 30px rgb(0,0,0,0.12);",
      }

    },
    important: '.barbieri-widget',
    breakpointsInspector: {
      position: ['bottom', 'left'],
    },
  },
  plugins: [
    require('tailwindcss-breakpoints-inspector'),
  ]
})