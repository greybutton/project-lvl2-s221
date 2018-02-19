import fs from 'fs';

import genDiff from '../src';

test('gendiff cmd', () => {
  const before = fs.readFileSync('__test__/__fixtures__/before.json');
  const after = fs.readFileSync('__test__/__fixtures__/after.json');
  const received = genDiff(before, after);
  const expected = `{
        host: hexlet.io
      + timeout: 20
      - timeout: 50
      - proxy: 123.234.53.22
      + verbose: true
    }
    `;
  expect(received).toBe(expected);
});

test('gendiff module', () => {
  const before = {
    "host": "hexlet.io",
    "timeout": 50,
    "proxy": "123.234.53.22"
  };
  const after = {
    "timeout": 20,
    "verbose": true,
    "host": "hexlet.io"
  };
  const received = genDiff(before, after);
  const expected = `{
        host: hexlet.io
      + timeout: 20
      - timeout: 50
      - proxy: 123.234.53.22
      + verbose: true
    }
    `;
  expect(received).toBe(expected);
});

