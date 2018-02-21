import path from 'path';
import fs from 'fs';
import yaml from 'js-yaml';
import ini from 'ini';
import { union } from 'lodash';

const parse = {
  '.json': JSON.parse,
  '.yml': yaml.safeLoad,
  '.ini': ini.parse,
};

const readConfig = config =>
  fs.readFileSync(config, 'utf-8');

const makeDiffString = (first, second) => {
  const properties = union(Object.keys(first), Object.keys(second));

  const diffString = properties.map((key) => {
    if (first[key] && !second[key]) {
      return `      - ${key}: ${first[key]}`;
    } else if (!first[key] && second[key]) {
      return `      + ${key}: ${second[key]}`;
    } else if (first[key] !== second[key]) {
      return `      + ${key}: ${second[key]}\n      - ${key}: ${first[key]}`;
    }
    return `        ${key}: ${first[key]}`;
  });

  return `{\n${diffString.join('\n')}\n    }\n    `;
};

export default (firstConfig, secondConfig) => {
  const first = readConfig(firstConfig);
  const second = readConfig(secondConfig);
  const ext = path.extname(firstConfig);

  const firstObject = parse[ext](first);
  const secondObject = parse[ext](second);
  const diffString = makeDiffString(firstObject, secondObject);

  return diffString;
};
