import { Pipe, PipeTransform } from '@angular/core';
import { AppFacade } from '@store/app';
import { filter, firstValueFrom, map } from 'rxjs';

@Pipe({
  name: 'configLink',
})
export class ConfigLinkPipe implements PipeTransform {
  constructor(private appFacade: AppFacade) {}

  async transform(key: string) {
    const observable = this.appFacade.linkConfigItems$.pipe(
      filter(configs => configs.length > 0),
      map((items) => {
        const config = items.find((c) => c.name === key);
        return config?.value || null;
      })
    );
    const result = await firstValueFrom(observable);
    return result;
  }
}
