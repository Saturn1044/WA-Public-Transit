/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        transit: {
          blue: '#005DAA',
          green: '#1a6b3c',
          dark: '#0d1b2a',
          light: '#e8f4fd',
        },
      },
    },
  },
  plugins: [],
}
