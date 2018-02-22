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
      return [...acc, [key, null, '-', makeAst(first[key], {})]];
    } else if (first[key] instanceof Object && !(second[key] instanceof Object)) {
      return [...acc, [key, null, '-', makeAst(first[key], {})], [key, second[key], '+']];
    } else if (first[key] && !(first[key] instanceof Object) && second[key] instanceof Object) {
      return [...acc, [key, first[key], '-'], [key, null, '+', makeAst({}, second[key])]];
    } else if (!first[key] && second[key] instanceof Object) {
      return [...acc, [key, null, '+', makeAst({}, second[key])]];
    } else if (first[key] instanceof Object && second[key] instanceof Object) {
      return [...acc, [key, null, ' ', makeAst(first[key], second[key])]];
    } else if (first[key] && !second[key]) {
      return [...acc, [key, first[key], '-']];
    } else if (!first[key] && second[key]) {
      return [...acc, [key, second[key], '+']];
    } else if (first[key] !== second[key]) {
      return [...acc, [key, second[key], '+'], [key, first[key], '-']];
    }
    return [...acc, [key, first[key], ' ']];
  }, []);

  return ast;
};

const makeString = (ast, deep = 1) => {
  const padding = ' '.repeat(6 * deep);

  const string = ast.reduce((acc, [key, value, operation, children]) => {
    const child = children ? `${makeString(children, deep + 1)}${padding}}\n` : '';
    return `${acc}${padding}${operation} ${key}: ${value || '{'}\n${child}`;
  }, '');

  return `{\n${string}${' '.repeat(4)}}\n${' '.repeat(4)}`;
};

export default (firstConfig, secondConfig) => {
  const first = readConfig(firstConfig);
  const second = readConfig(secondConfig);
  const ext = path.extname(firstConfig);

  const firstObject = parse[ext](first);
  const secondObject = parse[ext](second);

  const ast = makeAst(firstObject, secondObject);
  const string = makeString(ast);

  return string;
};
