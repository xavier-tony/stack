const { createGlobPatternsForDependencies } = require('@nrwl/angular/tailwind');
const { join } = require('path');

module.exports = {
  content: [
    join(__dirname, 'src/**/*.{html,ts}'),
    '../../libs/**/*.{html,ts}',
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ['Oswald'],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
