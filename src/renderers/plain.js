import { flatten, compact } from 'lodash';

const makePlain = (ast, path) => {
  const stringifyValue = (value) => {
    if (value instanceof Object) {
      return 'with complex value';
    }
    return `with value: '${value}'`;
  };

  const handlers = {
    add: ({ to }, valuePath) => `Property '${valuePath}' was added ${stringifyValue(to)}`,
    delete: ({ from }, valuePath) => `Property '${valuePath}' was removed ${stringifyValue(from)}`,
    update: ({ from, to }, valuePath) => {
      if (from instanceof Object || to instanceof Object) {
        return `Property '${valuePath}' was updated with complex value`;
      }
      return `Property '${valuePath}' was updated. From '${from}' to '${to}'`;
    },
    nochange: () => '',
  };

  const result = ast.reduce((acc, node) => {
    const valuePath = path ? `${path}.${node.key}` : node.key;

    if (node.children) {
      return [...acc, makePlain(node.children, valuePath)];
    }

    return [...acc, handlers[node.type](node, valuePath)];
  }, []);

  return compact(flatten(result));
};

export default ast => makePlain(ast).join('\n');
