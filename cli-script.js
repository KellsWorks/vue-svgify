const commander = require('commander');
const { convert } = require('./index');

commander
  .version('1.0.0')
  .description('Convert SVG files to Vue components.')
  .arguments('<path> <output>')
  .action((path, output) => {
    convert(path, output);
  })
  .parse(process.argv);
