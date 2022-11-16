const StyleDictionary = require('style-dictionary');

const StyleDictionaryExtended = StyleDictionary.extend({
  source: ['tokens/**/*.json'],
  platforms: {
    scss: {
      transformGroup: 'scss',
      buildPath: 'dist/',
      files: [
        {
          destination: 'variables.scss',
          format: 'scss/variables',
        },
      ],
    },
    // ...
  },
});

StyleDictionaryExtended.buildAllPlatforms();
