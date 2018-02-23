import fs from 'fs';
import genDiff from '../src';

describe('JSON', () => {
  test('flat diff', () => {
    const before = '__tests__/__fixtures__/json/before.json';
    const after = '__tests__/__fixtures__/json/after.json';
    const received = genDiff(before, after);
    const expected = '__tests__/__fixtures__/result_flat_diff.txt';

    expect(received).toBe(fs.readFileSync(expected, 'utf-8'));
  });

  test('tree diff', () => {
    const before = '__tests__/__fixtures__/json/before_tree.json';
    const after = '__tests__/__fixtures__/json/after_tree.json';
    const received = genDiff(before, after);
    const expected = '__tests__/__fixtures__/result_tree_diff.txt';

    expect(received).toBe(fs.readFileSync(expected, 'utf-8'));
  });

  test('flat plain', () => {
    const before = '__tests__/__fixtures__/json/before.json';
    const after = '__tests__/__fixtures__/json/after.json';
    const received = genDiff(before, after, 'plain');
    const expected = '__tests__/__fixtures__/result_flat_plain.txt';

    expect(received).toBe(fs.readFileSync(expected, 'utf-8'));
  });

  test('tree plain', () => {
    const before = '__tests__/__fixtures__/json/before_tree.json';
    const after = '__tests__/__fixtures__/json/after_tree.json';
    const received = genDiff(before, after, 'plain');
    const expected = '__tests__/__fixtures__/result_tree_plain.txt';

    expect(received).toBe(fs.readFileSync(expected, 'utf-8'));
  });

  test('flat json', () => {
    const before = '__tests__/__fixtures__/json/before.json';
    const after = '__tests__/__fixtures__/json/after.json';
    const received = genDiff(before, after, 'json');
    const expected = '__tests__/__fixtures__/result_flat_json.txt';

    expect(received).toBe(fs.readFileSync(expected, 'utf-8'));
  });
});
