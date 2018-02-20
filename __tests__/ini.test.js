import genDiff from '../src';

describe('INI', () => {
  test('gendiff cmd', () => {
    const before = '__tests__/__fixtures__/before.ini';
    const after = '__tests__/__fixtures__/after.ini';
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
