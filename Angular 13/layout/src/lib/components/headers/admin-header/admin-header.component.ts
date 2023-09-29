import { Component, Input } from '@angular/core';
import { ClientData, Permission, User } from '@entities';
import { UtilityService } from '@shared/services';
import { SystemDefaultsFacade } from '@store/system-defaults';
import { Observable } from 'rxjs';

@Component({
  selector: 'admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.scss'],
})
export class AdminHeaderComponent {
  @Input() user$: Observable<User>;
  @Input() clientData: ClientData;
  @Input() clientLogo: string;
  @Input() defaultsLoaded: boolean;
  
  isEnableMFA$ = this.systemDefaultFacade.isEnableMFA$;

  constructor(public utilityService: UtilityService, private systemDefaultFacade: SystemDefaultsFacade) {}
}
