/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // 👈 bắt buộc để Tailwind nhận dark
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

