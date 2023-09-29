import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currencyTransform',
})
export class CurrencyTransformPipe implements PipeTransform {
  constructor() {}

  transform(input: any, args?: any): any {
    var exp,
      rounded,
      suffixes = ['k', 'M', 'G', 'T', 'P', 'E'];
    if (Number.isNaN(input)) {
      return null;
    }

    if (input < 1000) {
      return input;
    }

    exp = Math.floor(Math.log(input) / Math.log(1000));
    rounded = (input / Math.pow(1000, exp)).toFixed(args);
    return rounded + suffixes[exp - 1];
  }
}
