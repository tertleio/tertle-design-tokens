const StyleDictionary = require('style-dictionary');
const fs = require('fs');
const path = require('path');

// 1. read files
// 2. dist to

const StyleDictionaryExtended = StyleDictionary.extend({
  source: ['tokens/**/*.json'],
  platforms: {
    css: {
      transformGroup: 'css',
      buildPath: 'dist/css/',
      files: [
        {
          destination: '_variables.css',
          format: 'css/variables',
        },
      ],
    },
    scss: {
      transformGroup: 'scss',
      buildPath: 'dist/scss/',
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

function buildRawDist() {
  const read = 'tokens';
  const write = 'dist/raw';

  const filenames = fs.readdirSync(path.join(__dirname, read));
  const files = filenames.map((filename) => {
    return {
      name: filename,
      content: JSON.parse(
        fs.readFileSync(path.resolve(__dirname, `${read}/${filename}`))
      ),
    };
  });

  let light = {};
  let dark = {};

  files.forEach(({ name, content }) => {
    if (name === 'colors.json') {
      const { global, light: l, dark: d } = content.color;
      light = { global, color: l };
      dark = { global, color: d };
    } else {
      for (const key in content) {
        light[key] = content;
        dark[key] += content;
      }
    }
  });

  fs.writeFileSync(
    path.resolve(__dirname, `./${write}/dark.json`),
    JSON.stringify(light)
  );
  fs.writeFileSync(
    path.resolve(__dirname, `./${write}/light.json`),
    JSON.stringify(dark)
  );
}

buildRawDist();
StyleDictionaryExtended.buildAllPlatforms();
