import { DecimalPipe } from '@angular/common';
import { CustomDecimalPipe } from './custom-decimal.pipe';

describe('CustomDecimalPipe', () => {
  let customDecimalPipe: CustomDecimalPipe;
  let decimalPipe: DecimalPipe;

  beforeEach(() => {
    decimalPipe = new DecimalPipe('en-US');
    customDecimalPipe = new CustomDecimalPipe(decimalPipe);
  });

  it('should create an instance', () => {
    expect(customDecimalPipe).toBeTruthy();
  });

  it('should format a number correctly', () => {
    const inputNumber = 123.456789;
    const formattedValue = customDecimalPipe.transform(inputNumber);
    const expectedFormattedValue = decimalPipe.transform(inputNumber, '1.6-6') + '%';
    expect(formattedValue).toEqual(expectedFormattedValue);
  });

  it('should handle undefined input', () => {
    const formattedValue = customDecimalPipe.transform(undefined);
    const expectedFormattedValue = '0.000000%';
    expect(formattedValue).toEqual(expectedFormattedValue);
  });

  it('should handle null input', () => {
    const formattedValue = customDecimalPipe.transform(null);
    const expectedFormattedValue = '0.000000%';
    expect(formattedValue).toEqual(expectedFormattedValue);
  });

  it('should handle zero input', () => {
    const formattedValue = customDecimalPipe.transform(0);
    const expectedFormattedValue = '0.000000%';
    expect(formattedValue).toEqual(expectedFormattedValue);
  });
});
