/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["'Hanken Grotesk'", "monospace"],
        body: ["'Fraunces'", "san serif"],
      },
    },
  },
  plugins: [],
};
