const { createGlobPatternsForDependencies } = require('@nrwl/angular/tailwind');
const { join } = require('path');

module.exports = {
  content: [
    join( __dirname, 'src/**/!(*.stories|*.spec).{ts,html}' ),
     '../../libs/**/*.{html,ts}',
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
