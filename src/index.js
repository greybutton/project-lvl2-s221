import path from 'path';
import fs from 'fs';
import yaml from 'js-yaml';
import ini from 'ini';
import { union, find } from 'lodash';

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

  const handlers = [
    {
      check: key => first[key] instanceof Object && second[key] instanceof Object,
      node: key => ({
        type: 'nochange', key, children: makeAst(first[key], second[key]),
      }),
    },
    {
      check: key => first[key] === second[key],
      node: key => ({
        type: 'nochange', key, from: first[key], to: first[key],
      }),
    },
    {
      check: key => first[key] && !second[key],
      node: key => ({
        type: 'delete', key, from: first[key], to: first[key],
      }),
    },
    {
      check: key => !first[key] && second[key],
      node: key => ({
        type: 'add', key, from: second[key], to: second[key],
      }),
    },
    {
      check: key => first[key] !== second[key],
      node: key => ({
        type: 'update', key, from: first[key], to: second[key],
      }),
    },
  ];

  const ast = properties.reduce((acc, key) => {
    const { node } = find(handlers, ({ check }) => check(key));
    return [...acc, node(key)];
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
  const result = render(format)(ast);

  return result;
};
