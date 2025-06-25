/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          50: '#f0f4f8',
          100: '#d9e2ec',
          200: '#bcccdc',
          300: '#9fb3c8',
          400: '#829ab1',
          500: '#627d98',
          600: '#486581',
          700: '#334e68',
          800: '#243b53',
          900: '#102a43',
        },
        yellow: {
          50: '#fffbea',
          100: '#fff3c4',
          200: '#fce588',
          300: '#fadb5f',
          400: '#f7c948',
          500: '#f0b429',
          600: '#de911d',
          700: '#cb6e17',
          800: '#b44d12',
          900: '#8d2b0b',
        },
        beige: {
          50: '#f9f7f3',
          100: '#f2ece4',
          200: '#e8dfd2',
          300: '#ddcdb7',
          400: '#d3bc9b',
          500: '#c9ab80',
          600: '#b08e5f',
          700: '#8e7048',
          800: '#6d5434',
          900: '#4d3a23',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}