export default (firstConfig, secondConfig) => {
  let first;
  let second;
  if (firstConfig instanceof Object) {
    first = firstConfig;
    second = secondConfig;
  } else {
    first = JSON.parse(firstConfig);
    second = JSON.parse(secondConfig);
  }

  const uniq = arrArg => arrArg.filter((elem, pos, arr) => arr.indexOf(elem) === pos);

  const properties = uniq(Object.keys(first).concat(Object.keys(second)));

  const difference = properties.reduce((acc, key) => {
    if (first[key] && !second[key]) {
      return { ...acc, [`     - ${key}`]: first[key] };
    } else if (!first[key] && second[key]) {
      return { ...acc, [`     + ${key}`]: second[key] };
    } else if (first[key] !== second[key]) {
      return { ...acc, [`     + ${key}`]: second[key], [`     - ${key}`]: first[key] };
    } else if (first[key] === second[key]) {
      return { ...acc, [` ${key}`]: first[key] };
    }
  }, {});

  const strings = Object.entries(difference).reduce((acc, [key, prop], index) => {
    if (index === Object.entries(difference).length - 1) {
      return `${acc} ${key}: ${prop}`;
    }
    return `${acc} ${key}: ${prop}\n`;
  }, '');

  const result = `{
      ${strings}
    }
    `;

  return result;
}
