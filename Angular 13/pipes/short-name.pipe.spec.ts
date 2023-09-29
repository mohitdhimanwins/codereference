import { ShortNamePipe } from './short-name.pipe';

describe('ShortNamePipe', () => {
  let pipe: ShortNamePipe;

  beforeEach(() => {
    pipe = new ShortNamePipe();
  });

  it('should ...', () => {
    expect(pipe).toBeTruthy();
  });

  it('should check with empty value', () => {
    expect(pipe.transform('')).toBe('');
  });

  it('transforms "abc" to "A"', () => {
    expect(pipe.transform('abc')).toBe('A');
  });

  it('transforms "abc def" to "AD"', () => {
    expect(pipe.transform('abc def')).toBe('AD');
  });
});
