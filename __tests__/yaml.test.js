import fs from 'fs';
import genDiff from '../src';

describe('YAML', () => {
  test('flat diff', () => {
    const before = '__tests__/__fixtures__/yaml/before.yml';
    const after = '__tests__/__fixtures__/yaml/after.yml';
    const received = genDiff(before, after);
    const expected = '__tests__/__fixtures__/result_flat_diff.txt';

    expect(received).toBe(fs.readFileSync(expected, 'utf-8'));
  });

  test('flat plain', () => {
    const before = '__tests__/__fixtures__/yaml/before.yml';
    const after = '__tests__/__fixtures__/yaml/after.yml';
    const received = genDiff(before, after, 'plain');
    const expected = '__tests__/__fixtures__/result_flat_plain.txt';

    expect(received).toBe(fs.readFileSync(expected, 'utf-8'));
  });
});
