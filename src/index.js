import path from 'path';
import fs from 'fs';
import yaml from 'js-yaml';
import _ from 'lodash';

const parses = [
  {
    name: 'Object',
    check: config => config instanceof Object,
    parse: config => config,
  },
  {
    name: 'JSON',
    check: config => path.extname(config) === '.json',
    parse: config => JSON.parse(fs.readFileSync(config)),
  },
  {
    name: 'YAML',
    check: config => path.extname(config) === '.yml',
    parse: config => yaml.safeLoad(fs.readFileSync(config)),
  },
];

const getParse = config => _.find(parses, ({ check }) => check(config));

export default (firstConfig, secondConfig) => {
  const { parse } = getParse(firstConfig);

  const first = parse(firstConfig);
  const second = parse(secondConfig);

  const uniq = arrArg => arrArg.filter((elem, pos, arr) => arr.indexOf(elem) === pos);

  const properties = uniq(Object.keys(first).concat(Object.keys(second)));

  const difference = properties.reduce((acc, key) => {
    if (first[key] && !second[key]) {
      return { ...acc, [`     - ${key}`]: first[key] };
    } else if (!first[key] && second[key]) {
      return { ...acc, [`     + ${key}`]: second[key] };
    } else if (first[key] !== second[key]) {
      return { ...acc, [`     + ${key}`]: second[key], [`     - ${key}`]: first[key] };
    } else if (first[key] === second[key]) {
      return { ...acc, [` ${key}`]: first[key] };
    }
    return acc;
  }, {});

  const strings = Object.entries(difference).reduce((acc, [key, prop], index) => {
    if (index === Object.entries(difference).length - 1) {
      return `${acc} ${key}: ${prop}`;
    }
    return `${acc} ${key}: ${prop}\n`;
  }, '');

  const result = `{
      ${strings}
    }
    `;

  return result;
};
