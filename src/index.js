import path from 'path';
import fs from 'fs';
import yaml from 'js-yaml';
import ini from 'ini';
import { find, union } from 'lodash';

const configTypes = [
  {
    name: 'Object',
    check: config => config instanceof Object,
    read: config => config,
    parse: config => config,
  },
  {
    name: 'JSON',
    check: config => path.extname(config) === '.json',
    read: config => fs.readFileSync(config),
    parse: config => JSON.parse(config),
  },
  {
    name: 'YAML',
    check: config => path.extname(config) === '.yml',
    read: config => fs.readFileSync(config),
    parse: config => yaml.safeLoad(config),
  },
  {
    name: 'INI',
    check: config => path.extname(config) === '.ini',
    read: config => fs.readFileSync(config, 'utf-8'),
    parse: config => ini.parse(config),
  },
];

const findConfig = config => find(configTypes, ({ check }) => check(config));
const getConfig = name => find(configTypes, { name });

const readConfig = (firstConfig, secondConfig) => {
  const { name, read } = findConfig(firstConfig);

  const first = read(firstConfig);
  const second = read(secondConfig);

  return {
    name,
    first,
    second,
  };
};

const parseConfig = (name, first, second) => {
  const { parse } = getConfig(name);

  const firstObject = parse(first);
  const secondObject = parse(second);

  return {
    firstObject,
    secondObject,
  };
};

const makeDiffObject = (first, second) => {
  const properties = union(Object.keys(first), Object.keys(second));

  const diffObject = properties.reduce((acc, key) => {
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

  return diffObject;
};

const makeDiffString = (diffObject) => {
  const strings = Object.entries(diffObject).reduce((acc, [key, prop], index) => {
    if (index === Object.entries(diffObject).length - 1) {
      return `${acc} ${key}: ${prop}`;
    }
    return `${acc} ${key}: ${prop}\n`;
  }, '');

  const diffString = `{
      ${strings}
    }
    `;

  return diffString;
};

export default (firstConfig, secondConfig) => {
  const { name, first, second } = readConfig(firstConfig, secondConfig);
  const { firstObject, secondObject } = parseConfig(name, first, second);
  const diffObject = makeDiffObject(firstObject, secondObject);
  const diffString = makeDiffString(diffObject);
  return diffString;
};
