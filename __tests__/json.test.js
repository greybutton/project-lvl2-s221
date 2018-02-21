import genDiff from '../src';

describe('JSON', () => {
  test('gendiff', () => {
    const before = '__tests__/__fixtures__/before.json';
    const after = '__tests__/__fixtures__/after.json';
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
});
