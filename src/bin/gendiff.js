#!/usr/bin/env node

import commander from 'commander';

import gendiff from '..';

export default commander
  .version('0.0.0', '-V, --version')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<firstConfig>')
  .arguments('<secondConfig>')
  .option('-f, --format [type]', 'Output format')
  .action((firstConfig, secondConfig) => {
    console.log(gendiff(firstConfig, secondConfig));
  })
  .parse(process.argv);
