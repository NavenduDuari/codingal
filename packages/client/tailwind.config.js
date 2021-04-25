module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      transitionProperty: {
        'height': 'height',
        'spacing': 'margin, padding',
      }
    },
    colors: {
      orange: '#ff5a43',
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
