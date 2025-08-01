/** @type {import('tailwindcss').Config} */
import generated from '@tailwindcss/forms';

export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        main: '#FEC400',
        cinza: '#222629',
        primary: 'rgb(27, 22, 20)',
      },
      spacing: {
        hero: 'calc(100vh - 119px)',
      },
      backgroundImage: {
        waves: "url('/public/wave.png')",
      },
    },
  },
  plugins: [generated],
};
