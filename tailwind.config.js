/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      colors: {
        primary: '#FE724C',
        secondary: '#FFC529',
        whiteTransparent: '#FFFFFF33',
        'soft-cream': '#FFECE7',
        gray: {
          dark: '#1A1D26',
          light: '#d3d1d8',
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
        blue: {
          facebook: '#1877F2',
        },
        red: {
          google: '#DB4437',
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
      boxShadow: {
        'main-button': '0px 10px 30px 0px #FE724C33',
      },
    },
  },
  plugins: [],
};
