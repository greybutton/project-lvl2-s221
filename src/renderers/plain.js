import { find, flatten, compact } from 'lodash';

const makePlain = (ast, path) => {
  const stringifyValue = (value) => {
    if (value instanceof Object) {
      return 'with complex value';
    }
    return `with value: '${value}'`;
  };

  const handlers = [
    {
      name: 'add',
      toString: ({ to }, valuePath) => `Property '${valuePath}' was added ${stringifyValue(to)}`,
    },
    {
      name: 'delete',
      toString: ({ from }, valuePath) => `Property '${valuePath}' was removed ${stringifyValue(from)}`,
    },
    {
      name: 'update',
      toString: ({ from, to }, valuePath) => {
        if (from instanceof Object || to instanceof Object) {
          return `Property '${valuePath}' was updated with complex value`;
        }
        return `Property '${valuePath}' was updated. From '${from}' to '${to}'`;
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
      return [...acc, makePlain(node.children, valuePath)];
    }

    const { toString } = find(handlers, { name: node.type });
    return [...acc, toString(node, valuePath)];
  }, []);

  return compact(flatten(result));
};

export default ast => makePlain(ast).join('\n');
