/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js}'],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: '#F2C94C',
          dark: '#D4A820',
          light: '#F8E49A',
        },
        africa: {
          green: '#2D6E2D',
          'green-dark': '#1E5A1E',
          'green-light': '#3D8E3D',
        },
      },
      fontFamily: {
        script: ['Dancing Script', 'cursive'],
        body: ['Montserrat', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
