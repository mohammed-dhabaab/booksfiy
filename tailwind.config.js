/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx}"],
  mode: "jit",
  theme: {
    extend: {
      fontFamily: {
        "varela-round": ["Varela Round", "sans-serif"]
      }
    },
  },
  plugins: [
    require('daisyui'),
  ],
}

