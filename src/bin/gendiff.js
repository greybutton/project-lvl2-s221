#!/usr/bin/env node

import commander from 'commander';

import gendiff from '..';

export default commander
  .version('0.0.0', '-V, --version')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<firstConfig>')
  .arguments('<secondConfig>')
  .option('-f, --format [type]', 'Output format', 'diff')
  .action((firstConfig, secondConfig, options) => {
    console.log(gendiff(firstConfig, secondConfig, options.format));
  })
  .parse(process.argv);
