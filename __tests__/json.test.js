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

  test('gendiff rec', () => {
    const before = '__tests__/__fixtures__/before_rec.json';
    const after = '__tests__/__fixtures__/after_rec.json';
    const received = genDiff(before, after);
    const expected = `{
        common: {
            setting1: Value 1
          - setting2: 200
          - setting3: true
          + setting3: {
                key: value
            }
            setting6: {
                key: value
              + ops: vops
            }
          + setting4: blah blah
          + setting5: {
                key5: value5
            }
        }
        group1: {
          + baz: bars
          - baz: bas
            foo: bar
          - nest: {
                key: value
            }
          + nest: str
        }
      - group2: {
            abc: 12345
        }
      + group3: {
            fee: 100500
        }
    }
    `;
    expect(received).toBe(expected);
  });
});
