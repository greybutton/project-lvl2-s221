import { find } from 'lodash';

const makeString = (ast, deep = 1) => {
  const operators = {
    add: '+',
    delete: '-',
    update: '',
    nochange: ' ',
    complex: ' ',
  };

  const padding = n => ' '.repeat(2 * n);

  const stringify = (obj) => {
    const keys = Object.keys(obj);
    return `{\n${keys.reduce((acc, key) => `${acc}${padding(deep + 2)}${key}: ${obj[key]}\n`, '')}${padding(deep + 1)}}`;
  };

  const getValue = val => (val instanceof Object ? stringify(val) : val);

  const handlers = [
    {
      name: 'add',
      toString: ({
        type, key, to,
      }) => {
        const operator = operators[type];
        const value = getValue(to);
        return `${padding(deep)}${operator} ${key}: ${value || '{'}\n`;
      },
    },
    {
      name: 'delete',
      toString: ({
        type, key, from,
      }) => {
        const operator = operators[type];
        const value = getValue(from);
        return `${padding(deep)}${operator} ${key}: ${value || '{'}\n`;
      },
    },
    {
      name: 'nochange',
      toString: ({
        type, key, from, children,
      }) => {
        const operator = operators[type];
        const value = getValue(from);
        const child = children ? `${makeString(children, deep + 1)}${padding(deep + 1)}}\n` : '';
        return `${padding(deep)}${operator} ${key}: ${value || '{'}\n${child}`;
      },
    },
    {
      name: 'update',
      toString: ({
        key, from, to,
      }) => {
        const valueFrom = getValue(from);
        const valueTo = getValue(to);
        return `${padding(deep)}- ${key}: ${valueFrom}\n${padding(deep)}+ ${key}: ${valueTo}\n`;
      },
    },
  ];

  const string = ast.reduce((acc, node) => {
    const { toString } = find(handlers, { name: node.type });
    return `${acc}${toString(node)}`;
  }, '');

  return string;
};

export default ast => `{\n${makeString(ast)}}\n`;
