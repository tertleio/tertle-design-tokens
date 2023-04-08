const StyleDictionary = require('style-dictionary');
const fs = require('fs');
const path = require('path');

// const baseTransforms = ['attribute/cti', 'size/px'];
// const jsTransforms = baseTransforms.concat(['name/cti/pascal']);

const StyleDictionaryExtended = StyleDictionary.extend({
  source: ['tokens/**/*.json'],
  platforms: {
    js: {
      transformGroup: 'js',
      buildPath: 'tokens/es5/',
      files: [
        {
          destination: 'index.js',
          format: 'javascript/module',
        },
      ],
    },
    js: {
      transformGroup: 'js',
      buildPath: 'tokens/es6/',
      files: [
        {
          destination: 'index.js',
          format: 'javascript/es6',
        },
      ],
    },
    css: {
      transformGroup: 'css',
      buildPath: 'tokens/css/',
      files: [
        {
          destination: '_variables.css',
          format: 'css/variables',
        },
      ],
    },
    scss: {
      transformGroup: 'scss',
      buildPath: 'tokens/scss/',
      files: [
        {
          destination: '_variables.scss',
          format: 'scss/variables',
        },
      ],
    },
    // ...
  },
});

function buildJson() {
  const read = path.resolve(__dirname, `./src`);
  const write = path.resolve(__dirname, `./tokens/json`);
  const filenames = fs.readdirSync(read);

  filenames.forEach((filename) => {
    if (filename === 'colors.json') {
      const colors = JSON.parse(fs.readFileSync(`${read}/${filename}`));
      const { global, light: l, dark: d } = colors.color;
      const light = { global, color: l };
      const dark = { global, color: d };

      fs.writeFileSync(write + '/colors-global.json', JSON.stringify(global));
      fs.writeFileSync(write + '/colors-light.json', JSON.stringify(light));
      fs.writeFileSync(write + '/colors-dark.json', JSON.stringify(dark));
    } else {
      fs.copyFileSync(`${read}/${filename}`, `${write}/${filename}`);
      fs.copyFileSync(`${read}/${filename}`, `${write}/${filename}`);
    }
  });
}

buildJson();
StyleDictionaryExtended.buildAllPlatforms();
