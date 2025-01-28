/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      colors: {
        primary: '#FE724C',
        secondary: '#FFC529',
        whiteTransparent: '#FFFFFF33',
        gray: {
          dark: '#1A1D26',
          'ultra-light': '#F6F6F6',
          abbey: '#515154',
          manatee: '#9796A1',
        },
        pink: {
          light: '#ECDCDC',
        },
        orange: {
          custom: '#FE724C',
        },
      },
      fontSize: {
        micro: '7px',
        mini: '9px',
        tiny: '10px',
      },
      backdropBlur: {
        '5xl': '5px',
      },
    },
  },
  plugins: [],
};
