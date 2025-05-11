/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    fontFamily: {
      sans: ["Inter", "sans-serif"],
    },
    extend: {
      colors: {
        primary: "#09090B",
        secondary: "#FFFFFF",
        tertiary: "hsl(240, 3.8%, 45%)",
        accent: "hsl(240, 4.8%, 95.9%)",
      },
    },
  },
  plugins: [],
};
