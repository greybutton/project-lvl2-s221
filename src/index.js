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

const makeAst = (first, second) => {
  const properties = union(Object.keys(first), Object.keys(second));

  const ast = properties.reduce((acc, key) => {
    if (first[key] instanceof Object && !second[key]) {
      return [...acc, { type: 'delete', key, value: first[key] }];
    } else if (first[key] instanceof Object && !(second[key] instanceof Object)) {
      return [...acc, { type: 'delete', key, value: first[key] }, { type: 'add', key, value: second[key] }];
    } else if (first[key] && !(first[key] instanceof Object) && second[key] instanceof Object) {
      return [...acc, { type: 'delete', key, value: first[key] }, { type: 'add', key, value: second[key] }];
    } else if (!first[key] && second[key] instanceof Object) {
      return [...acc, { type: 'add', key, value: second[key] }];
    } else if (first[key] instanceof Object && second[key] instanceof Object) {
      return [...acc, { type: 'nochange', key, children: makeAst(first[key], second[key]) }];
    } else if (first[key] && !second[key]) {
      return [...acc, { type: 'delete', key, value: first[key] }];
    } else if (!first[key] && second[key]) {
      return [...acc, { type: 'add', key, value: second[key] }];
    } else if (first[key] !== second[key]) {
      return [...acc, { type: 'add', key, value: second[key] }, { type: 'delete', key, value: first[key] }];
    }
    return [...acc, { type: 'nochange', key, value: first[key] }];
  }, []);

  return ast;
};

const makeString = (ast, deep = 1) => {
  const padding = n => ' '.repeat(2 * n);
  const operators = {
    add: '+',
    delete: '-',
    nochange: ' ',
  };
  const stringify = (obj) => {
    const keys = Object.keys(obj);
    return `{\n${keys.reduce((acc, key) => `${acc}${padding(deep * deep)}${key}: ${obj[key]}\n`, '')}${padding(deep * deep)}}`;
  };

  const string = ast.reduce((acc, {
    type, key, value: val, children,
  }) => {
    const operator = operators[type];
    const child = children ? `${makeString(children, deep + 1)}${padding(deep ** deep)}}\n` : '';
    const value = val instanceof Object ? stringify(val) : val;

    return `${acc}${padding(deep)}${operator} ${key}: ${value || '{'}\n${child}`;
  }, '');
  return string;
};

export default (firstConfig, secondConfig) => {
  const first = readConfig(firstConfig);
  const second = readConfig(secondConfig);
  const ext = path.extname(firstConfig);

  const firstObject = parse[ext](first);
  const secondObject = parse[ext](second);

  const ast = makeAst(firstObject, secondObject);
  const string = makeString(ast);

  return `{\n${string}}\n`;
};
