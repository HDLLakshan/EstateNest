/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/app/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#4C9A2A',
          light: '#A7D08B',
          dark: '#2F7A18',
        },
        secondary: {
          DEFAULT: '#A7D08B',
          dark: '#708238',
        },
      },
    },
  },
};
