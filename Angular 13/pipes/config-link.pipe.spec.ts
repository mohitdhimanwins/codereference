import { AppFacade } from '@store/app';
import { BehaviorSubject } from 'rxjs';
import { ConfigLinkPipe } from './config-link.pipe';

describe('ConfigLinkPipe', () => {
  let pipe: ConfigLinkPipe;
  let appFacadeMock: Partial<AppFacade>;
  let linkConfigItemsSubject: BehaviorSubject<any[]>;

  beforeEach(() => {
    linkConfigItemsSubject = new BehaviorSubject<any[]>([]);

    appFacadeMock = {
      linkConfigItems$: linkConfigItemsSubject.asObservable(),
    };

    pipe = new ConfigLinkPipe(appFacadeMock as AppFacade);
  });

  it('should transform key to value correctly when key exists', async () => {
    const testKey = 'TestKey';
    const testValue = 'TestValue';

    linkConfigItemsSubject.next([{ name: testKey, value: testValue }]);

    const transformedValue = await pipe.transform(testKey);

    expect(transformedValue).toBe(testValue);
  });

});
