const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');
const mkdirp = require('mkdirp');
const svgComponentTemplate = require('./ComponentTemplate');

const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

const svgFolderPath = process.argv[2];
const outputComponentPath = process.argv[3];

if (!svgFolderPath || !outputComponentPath) {
  console.error('Usage: node index.js <SVG_FOLDER_PATH> <OUTPUT_COMPONENT_PATH>');
  process.exit(1);
}

fs.readdir(svgFolderPath, (err, files) => {
  if (err) {
    console.error(`Error reading SVG folder: ${err}`);
    process.exit(1);
  }

  files.forEach((file) => {
    if (path.extname(file).toLowerCase() === '.svg') {
      const svgFilePath = path.join(svgFolderPath, file);
      fs.readFile(svgFilePath, 'utf8', (err, data) => {
        if (err) {
          console.error(`Error reading SVG file: ${err}`);
          return;
        }
        const $ = cheerio.load(data);
        const svgContent = $('svg').html();
        if (!svgContent) {
          console.error(`SVG content not found in ${svgFilePath}. Skipping.`);
          return;
        }
        const svgFileName = path.basename(file, path.extname(file));
        const componentCode = svgComponentTemplate(svgContent, svgFileName);
        mkdirp.sync(outputComponentPath);
        fs.writeFileSync(`${outputComponentPath}/${capitalize(svgFileName)}Icon.vue`, componentCode);
        console.log(`Generated Vue component for ${svgFileName}`);
      });
    }
  });
});
