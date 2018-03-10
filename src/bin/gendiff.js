#!/usr/bin/env node

import commander from 'commander';

import { version } from '../../package.json';
import gendiff from '..';

export default commander
  .version(version, '-V, --version')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<firstConfig>')
  .arguments('<secondConfig>')
  .option('-f, --format [type]', 'Output format', 'diff')
  .action((firstConfig, secondConfig, options) => {
    console.log(gendiff(firstConfig, secondConfig, options.format));
  })
  .parse(process.argv);
