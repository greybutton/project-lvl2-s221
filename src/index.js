import path from 'path';
import fs from 'fs';
import yaml from 'js-yaml';
import ini from 'ini';
import { union } from 'lodash';

import render from './renderers';

const parse = {
  '.json': JSON.parse,
  '.yml': yaml.safeLoad,
  '.ini': ini.parse,
};

const readConfig = config =>
  fs.readFileSync(config, 'utf-8');

const makeAst = (first, second) => {
  const properties = union(Object.keys(first), Object.keys(second));

  const ast = properties.reduce((acc, key) => {
    if (first[key] instanceof Object && second[key] instanceof Object) {
      return [...acc, { type: 'complex', key, children: makeAst(first[key], second[key]) }];
    } else if (first[key] && !second[key]) {
      return [...acc, {
        type: 'delete', key, from: first[key], to: first[key],
      }];
    } else if (!first[key] && second[key]) {
      return [...acc, {
        type: 'add', key, from: second[key], to: second[key],
      }];
    } else if (first[key] !== second[key]) {
      return [...acc, {
        type: 'update', key, from: first[key], to: second[key],
      }];
    }
    return [...acc, {
      type: 'nochange', key, from: first[key], to: first[key],
    }];
  }, []);

  return ast;
};

export default (firstConfig, secondConfig, format) => {
  const first = readConfig(firstConfig);
  const second = readConfig(secondConfig);
  const ext = path.extname(firstConfig);

  const firstObject = parse[ext](first);
  const secondObject = parse[ext](second);

  const ast = makeAst(firstObject, secondObject);
  const result = render(format || 'json')(ast);

  return result;
};
