/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        body : "#2A2A2A",
        yellow : "#FFEAAE",
        "d-yellow" : "#FCCA3F",
        orange : "F6820C"
      },
    },
  },
  plugins: [],
}
