module.exports = {
  purge: ['./src/**/*.{ts,tsx,js,jsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      zIndex: {
        1: 1,
        2: 2,
        999: 999,
      },
      fontFamily: {
        roboto: 'Roboto',
      },
      gridTemplateRows: {
        modal: 'minmax(40px,1fr) auto minmax(40px,2fr)',
      },
      gridTemplateColumns: {
        modal: '40px 8fr 40px',
      },
      colors: {
        modal: 'rgba(193,201,210,.7)',
        primary: 'rgb(64, 153, 255)'
      },
      boxShadow: {
        focusradioShadow:
          'rgb(0 0 0 / 0%) 0px 0px 0px 0px, rgb(58 151 212 / 36%) 0px 0px 0px 4px, rgb(0 0 0 / 12%) 0px 1px 1px 0px, rgb(84 105 212) 0px 0px 0px 1px, rgb(0 0 0 / 0%) 0px 0px 0px 0px, rgb(0 0 0 / 0%) 0px 0px 0px 0px, rgb(60 66 87 / 8%) 0px 2px 5px 0px',
        radioShadow:
          'rgb(0 0 0 / 0%) 0px 0px 0px 0px, rgb(0 0 0 / 0%) 0px 0px 0px 0px, rgb(0 0 0 / 12%) 0px 1px 1px 0px, rgb(84 105 212) 0px 0px 0px 1px, rgb(0 0 0 / 0%) 0px 0px 0px 0px, rgb(0 0 0 / 0%) 0px 0px 0px 0px, rgb(60 66 87 / 8%) 0px 2px 5px 0px',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
