import fs from 'fs';
import genDiff from '../src';

describe('JSON', () => {
  test('gendiff', () => {
    const before = '__tests__/__fixtures__/before.json';
    const after = '__tests__/__fixtures__/after.json';
    const received = genDiff(before, after);
    const expected = '__tests__/__fixtures__/result.txt';

    expect(received).toBe(fs.readFileSync(expected, 'utf-8'));
  });

  test('gendiff rec', () => {
    const before = '__tests__/__fixtures__/before_rec.json';
    const after = '__tests__/__fixtures__/after_rec.json';
    const received = genDiff(before, after);
    const expected = '__tests__/__fixtures__/result_rec.txt';

    expect(received).toBe(fs.readFileSync(expected, 'utf-8'));
  });
});
