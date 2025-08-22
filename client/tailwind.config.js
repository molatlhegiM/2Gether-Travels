/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(210, 16%, 95%)",
        border: "hsl(213, 27%, 90%)",
        primary: "hsl(222, 47%, 11%)",
        // add any other colors your app uses
      },
      borderRadius: {
        lg: "0.5rem",
      },
    },
  },
  plugins: [],
}
