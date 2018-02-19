#!/usr/bin/env node

import commander from 'commander';
import fs from 'fs';

import gendiff from '..';

export default commander
  .version('0.0.0', '-V, --version')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<firstConfig>')
  .arguments('<secondConfig>')
  .option('-f, --format [type]', 'Output format')
  .action(function (firstConfig, secondConfig) {
    const first = fs.readFileSync(firstConfig).toString();
    const second = fs.readFileSync(secondConfig).toString();
    console.log(gendiff(first, second));
  })
  .parse(process.argv);
