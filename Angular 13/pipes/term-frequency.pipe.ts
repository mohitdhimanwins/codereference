import { Pipe, PipeTransform } from '@angular/core';
import { TermFrequency } from '@entities';

@Pipe({
  name: 'termFrequency',
})
export class TermFrequencyPipe implements PipeTransform {
  readonly termFrequencyMapping = {
    [TermFrequency.Monthly]: 'Monthly',
    [TermFrequency.SemiMonthly]: 'Semi-Monthly',
    [TermFrequency.BiWeekly]: 'Bi-Weekly',
    [TermFrequency.Weekly]: 'Weekly',
    [TermFrequency.Annually]: 'Annually',
    [TermFrequency.Daily]: 'Daily',
  };

  transform(value: TermFrequency): string {
    return this.termFrequencyMapping[value];
  }
}
