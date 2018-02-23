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

  const string = ast.reduce((acc, {
    type, key, from, to, children,
  }) => {
    if (type === 'update') {
      const valueFrom = getValue(from);
      const valueTo = getValue(to);
      return `${acc}${padding(deep)}- ${key}: ${valueFrom}\n${padding(deep)}+ ${key}: ${valueTo}\n`;
    }
    const operator = operators[type];
    const value = getValue(from);
    const child = children ? `${makeString(children, deep + 1)}${padding(deep + 1)}}\n` : '';
    return `${acc}${padding(deep)}${operator} ${key}: ${value || '{'}\n${child}`;
  }, '');

  return string;
};

export default ast => `{\n${makeString(ast)}}\n`;
