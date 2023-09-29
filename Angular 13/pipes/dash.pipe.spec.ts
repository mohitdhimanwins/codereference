import { DashPipe } from './dash.pipe';

describe('DashPipe', () => {
  let pipe: DashPipe;
  beforeEach(() => {
    pipe = new DashPipe();
  });
  it('should check with empty value', () => {
    expect(pipe.transform('')).toBe('-');
  });
  it('should check with empty value', () => {
    expect(pipe.transform('test')).toBe('test');
  });
});
