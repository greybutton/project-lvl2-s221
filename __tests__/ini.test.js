import fs from 'fs';
import genDiff from '../src';

describe('INI', () => {
  test('flat diff', () => {
    const before = '__tests__/__fixtures__/ini/before.ini';
    const after = '__tests__/__fixtures__/ini/after.ini';
    const received = genDiff(before, after, 'diff');
    const expected = '__tests__/__fixtures__/result_flat_diff.txt';

    expect(received).toBe(fs.readFileSync(expected, 'utf-8'));
  });

  test('tree diff', () => {
    const before = '__tests__/__fixtures__/ini/before_tree.ini';
    const after = '__tests__/__fixtures__/ini/after_tree.ini';
    const received = genDiff(before, after, 'diff');
    const expected = '__tests__/__fixtures__/result_tree_diff.txt';

    expect(received).toBe(fs.readFileSync(expected, 'utf-8'));
  });

  test('flat plain', () => {
    const before = '__tests__/__fixtures__/ini/before.ini';
    const after = '__tests__/__fixtures__/ini/after.ini';
    const received = genDiff(before, after, 'plain');
    const expected = '__tests__/__fixtures__/result_flat_plain.txt';

    expect(received).toBe(fs.readFileSync(expected, 'utf-8'));
  });

  test('tree plain', () => {
    const before = '__tests__/__fixtures__/ini/before_tree.ini';
    const after = '__tests__/__fixtures__/ini/after_tree.ini';
    const received = genDiff(before, after, 'plain');
    const expected = '__tests__/__fixtures__/result_tree_plain.txt';

    expect(received).toBe(fs.readFileSync(expected, 'utf-8'));
  });

  test('flat json', () => {
    const before = '__tests__/__fixtures__/ini/before.ini';
    const after = '__tests__/__fixtures__/ini/after.ini';
    const received = genDiff(before, after, 'json');
    const expected = '__tests__/__fixtures__/result_flat_json_ini.txt';

    expect(received).toBe(fs.readFileSync(expected, 'utf-8'));
  });
});
