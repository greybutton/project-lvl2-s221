import fs from 'fs';
import genDiff from '../src';

describe('YAML', () => {
  test('flat diff', () => {
    const before = '__tests__/__fixtures__/yaml/before.yml';
    const after = '__tests__/__fixtures__/yaml/after.yml';
    const received = genDiff(before, after, 'diff');
    const expected = '__tests__/__fixtures__/result_flat_diff.txt';

    expect(received).toBe(fs.readFileSync(expected, 'utf-8'));
  });

  test('tree diff', () => {
    const before = '__tests__/__fixtures__/yaml/before_tree.yml';
    const after = '__tests__/__fixtures__/yaml/after_tree.yml';
    const received = genDiff(before, after, 'diff');
    const expected = '__tests__/__fixtures__/result_tree_diff.txt';

    expect(received).toBe(fs.readFileSync(expected, 'utf-8'));
  });

  test('flat plain', () => {
    const before = '__tests__/__fixtures__/yaml/before.yml';
    const after = '__tests__/__fixtures__/yaml/after.yml';
    const received = genDiff(before, after, 'plain');
    const expected = '__tests__/__fixtures__/result_flat_plain.txt';

    expect(received).toBe(fs.readFileSync(expected, 'utf-8'));
  });

  test('tree plain', () => {
    const before = '__tests__/__fixtures__/yaml/before_tree.yml';
    const after = '__tests__/__fixtures__/yaml/after_tree.yml';
    const received = genDiff(before, after, 'plain');
    const expected = '__tests__/__fixtures__/result_tree_plain.txt';

    expect(received).toBe(fs.readFileSync(expected, 'utf-8'));
  });

  test('flat json', () => {
    const before = '__tests__/__fixtures__/yaml/before.yml';
    const after = '__tests__/__fixtures__/yaml/after.yml';
    const received = genDiff(before, after, 'json');
    const expected = '__tests__/__fixtures__/result_flat_json.txt';

    expect(received).toBe(fs.readFileSync(expected, 'utf-8'));
  });
});
