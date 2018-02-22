import fs from 'fs';
import genDiff from '../src';

describe('INI', () => {
  test('gendiff', () => {
    const before = '__tests__/__fixtures__/before.ini';
    const after = '__tests__/__fixtures__/after.ini';
    const received = genDiff(before, after);
    const expected = '__tests__/__fixtures__/result.txt';

    expect(received).toBe(fs.readFileSync(expected, 'utf-8'));
  });
});
