import { find } from 'lodash';

const makePlain = (ast, path) => {
  const handlers = [
    {
      name: 'add',
      toString: ({ to }, valuePath) => {
        if (to instanceof Object) {
          return `Property '${valuePath}' was added with complex value\n`;
        }
        return `Property '${valuePath}' was added with value: '${to}'\n`;
      },
    },
    {
      name: 'delete',
      toString: ({ from }, valuePath) => {
        if (from instanceof Object) {
          return `Property '${valuePath}' was removed with complex value\n`;
        }
        return `Property '${valuePath}' was removed\n`;
      },
    },
    {
      name: 'update',
      toString: ({ from, to }, valuePath) => {
        if (from instanceof Object || to instanceof Object) {
          return `Property '${valuePath}' was updated with complex value\n`;
        }
        return `Property '${valuePath}' was updated. From '${from}' to '${to}'\n`;
      },
    },
    {
      name: 'nochange',
      toString: () => '',
    },
  ];

  const result = ast.reduce((acc, node) => {
    const valuePath = path ? `${path}.${node.key}` : node.key;

    if (node.children) {
      return `${acc}${makePlain(node.children, valuePath)}`;
    }

    const { toString } = find(handlers, { name: node.type });
    return `${acc}${toString(node, valuePath)}`;
  }, '');

  return result;
};

export default ast => makePlain(ast);
