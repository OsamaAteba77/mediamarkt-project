/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#df0000', // MediaMarkt Red
        secondary: '#191919', // Dark Grey/Black
        light: '#f7f7f7'
      }
    },
  },
  plugins: [],
}