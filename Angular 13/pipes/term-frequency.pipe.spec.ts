import { TermFrequencyPipe } from './term-frequency.pipe';
import { TermFrequency } from '@entities';
describe('TermFrequencyPipe', () => {
  let pipe: TermFrequencyPipe;

  beforeEach(() => {
    pipe = new TermFrequencyPipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should transform TermFrequency.Monthly correctly', () => {
    const result = pipe.transform(TermFrequency.Monthly);
    expect(result).toBe('Monthly');
  });

  it('should transform TermFrequency.SemiMonthly correctly', () => {
    const result = pipe.transform(TermFrequency.SemiMonthly);
    expect(result).toBe('Semi-Monthly');
  });

  it('should transform TermFrequency.BiWeekly correctly', () => {
    const result = pipe.transform(TermFrequency.BiWeekly);
    expect(result).toBe('Bi-Weekly');
  });

  it('should transform TermFrequency.Weekly correctly', () => {
    const result = pipe.transform(TermFrequency.Weekly);
    expect(result).toBe('Weekly');
  });

  it('should transform TermFrequency.Annually correctly', () => {
    const result = pipe.transform(TermFrequency.Annually);
    expect(result).toBe('Annually');
  });

  it('should transform TermFrequency.Daily correctly', () => {
    const result = pipe.transform(TermFrequency.Daily);
    expect(result).toBe('Daily');
  });
});
