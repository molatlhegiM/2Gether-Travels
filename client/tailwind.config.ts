/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: "var(--navy)",
        gold: "var(--gold)",
        teal: "var(--teal)",
        ink: "var(--ink)",
        slate: "var(--slate)",
        mist: "var(--mist)",
        white: "var(--white)",
        afiiaBlue: "var(--afiia-blue)",
        afiiaGreen: "var(--afiia-green)",
        background: "var(--mist)",       // matches your bg-background class
        foreground: "var(--ink)",        // matches your text-foreground class
        border: "var(--slate)",          // matches your border-border class
      },
      borderRadius: {
        lg: "var(--radius)",
      },
      boxShadow: {
        custom: "var(--shadow)",
      },
      spacing: {
        gap: "var(--gap)",
      },
    },
  },
  plugins: [],
}
