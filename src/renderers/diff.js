import { flatten } from 'lodash';

const makeString = (ast, deep = 1) => {
  const padding = n => ' '.repeat(2 * n);

  const stringify = (obj) => {
    const keys = Object.keys(obj);
    const string = keys.reduce((acc, key) => [...acc, `${padding(deep + 2)}${key}: ${obj[key]}`], []).join('\n');
    return `{\n${string}\n${padding(deep + 1)}}`;
  };

  const getValue = val => (val instanceof Object ? stringify(val) : val);

  const handlers = {
    add: ({ key, to }) => {
      const value = getValue(to);
      return `${padding(deep)}+ ${key}: ${value}`;
    },
    delete: ({ key, from }) => {
      const value = getValue(from);
      return `${padding(deep)}- ${key}: ${value}`;
    },
    nochange: ({ key, from, children }) => {
      const value = getValue(from);
      const child = children ? `${makeString(children, deep + 1)}\n${padding(deep + 1)}}` : '';
      return `${padding(deep)}  ${key}: ${value || '{\n'}${child}`;
    },
    update: ({ key, from, to }) => {
      const valueFrom = getValue(from);
      const valueTo = getValue(to);
      return [`${padding(deep)}- ${key}: ${valueFrom}`, `${padding(deep)}+ ${key}: ${valueTo}`];
    },
  };

  const string = ast.reduce((acc, node) => [...acc, handlers[node.type](node)], []);

  return flatten(string).join('\n');
};

export default ast => `{\n${makeString(ast)}\n}`;
