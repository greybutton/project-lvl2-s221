import json from './json';
import plain from './plain';

const renderers = {
  json,
  plain,
};

export default format => renderers[format];
