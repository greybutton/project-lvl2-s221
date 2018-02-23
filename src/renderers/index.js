import diff from './diff';
import plain from './plain';
import json from './json';

const renderers = {
  diff,
  plain,
  json,
};

export default format => renderers[format];
