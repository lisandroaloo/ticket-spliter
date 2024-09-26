/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**'],
  theme: {
    extend: {},
  },
  plugins: [
    require('tailwind-scrollbar'), // Instala este plugin si no lo tienes
  ],
}

