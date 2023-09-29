import { DecimalPipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'decimal',
})
export class CustomDecimalPipe implements PipeTransform {
  constructor(private decimalPipe: DecimalPipe) {}

  transform(value?: number): string {
    value = value ?? 0;
    const formattedValue = this.decimalPipe.transform(value, '1.6-6');
    return `${formattedValue}%`;
  }
}