import { describe, expect, it } from 'vitest';
import { codeLineRanges, codeLineBackground } from '../src/code-line-ranges';

describe('Markdown code line selections', () => {
  it('supports individual lines, ranges, whitespace, unsorted overlaps and duplicates', () => {
    expect(codeLineRanges('8, 3-5, 1, 4-6, 8', 10)).toEqual([[1, 1], [3, 6], [8, 8]]);
  });
  it('clips to the block without expanding arbitrarily large ranges', () => {
    expect(codeLineRanges('2-900000000, 30', 12)).toEqual([[2, 12]]);
  });
  it.each(['', '0', '-1', '3-1', '1,,3', '2.5', '1; color:red', '1-', '9007199254740992'])('rejects invalid input %s', input => {
    expect(codeLineRanges(input, 10)).toEqual([]);
  });
  it('uses source line offsets and keeps the configurable color in every band', () => {
    const result = codeLineBackground('1, 3-5', 8);
    expect(result).toContain('0lh 1lh');
    expect(result).toContain('2lh 5lh');
    expect(result.match(/var\(--hacksidian-code-line-highlight\)/g)).toHaveLength(2);
    expect(codeLineBackground('20', 8)).toBe('none');
  });
});
