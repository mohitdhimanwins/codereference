import { MaskedPipe } from './masked.pipe';

describe('MaskedPipe', () => {
  let pipe: MaskedPipe;

  beforeEach(() => {
    pipe = new MaskedPipe();
  });

  it('should ...', () => {
    expect(pipe).toBeTruthy();
  });
  it('should check with empty value', () => {
    expect(pipe.transform('')).toBe('');
  });
  it('should check with empty value', () => {
    const result = pipe.transform('test', true);
    expect(result).toBe('****');
  });
});
