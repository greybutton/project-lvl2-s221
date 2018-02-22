import fs from 'fs';
import genDiff from '../src';

describe('YAML', () => {
  test('gendiff', () => {
    const before = '__tests__/__fixtures__/before.yml';
    const after = '__tests__/__fixtures__/after.yml';
    const received = genDiff(before, after);
    const expected = '__tests__/__fixtures__/result.txt';

    expect(received).toBe(fs.readFileSync(expected, 'utf-8'));
  });
});
