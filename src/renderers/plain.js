const makePlain = (ast, path) => {
  const result = ast.reduce((acc, node) => {
    const valuePath = path ? `${path}.${node.key}` : node.key;

    if (node.children) {
      return `${acc}${makePlain(node.children, valuePath)}`;
    }

    if (node.type === 'update' && (node.from instanceof Object || node.to instanceof Object)) {
      return `${acc}Property '${valuePath}' was updated with complex value\n`;
    } else if (node.type === 'update') {
      return `${acc}Property '${valuePath}' was updated. From '${node.from}' to '${node.to}'\n`;
    }

    if (node.type === 'add' && node.to instanceof Object) {
      return `${acc}Property '${valuePath}' was added with complex value\n`;
    } else if (node.type === 'add') {
      return `${acc}Property '${valuePath}' was added with value: '${node.to}'\n`;
    }

    if (node.type === 'delete' && node.from instanceof Object) {
      return `${acc}Property '${valuePath}' was removed with complex value\n`;
    } else if (node.type === 'delete') {
      return `${acc}Property '${valuePath}' was removed\n`;
    }
    return acc;
  }, '');

  return result;
};

export default ast => makePlain(ast);
