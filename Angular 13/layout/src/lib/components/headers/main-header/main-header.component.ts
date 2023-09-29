import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ClientData, Permission, User } from '@entities';
import { UtilityService } from '@shared/services';

export interface State {
  flag: string;
  name: string;
  population: string;
}

interface DefaultValues {
  isEnableMFA: boolean;
  isLoaded: boolean;
  isFormDirty: boolean;
  isFormValid: boolean;
}

interface IntegrationManagement {
  isDmsEnabled: boolean;
  hasCredit700Enabled: boolean;
  creditDashoardUrl: string;
}
@Component({
  selector: 'main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.scss'],
})
export class MainHeaderComponent {
  @Input() user: User;
  @Input() clientData: ClientData;
  // @Input() dmsImport: boolean;
  @Input() clientLogo: string;
  @Input() defaultValues: DefaultValues;
  @Input() data: IntegrationManagement;
  @Output() exitImpersonation = new EventEmitter<void>();

  readonly AvailablePermissions = Permission;
  constructor(public utilityService: UtilityService) {}

  onError(event) {
    event.target.src = 'assets/core/images/client-logos/' + this.clientData?.logo;
  }

  hanleExitImpersonation() {
    this.exitImpersonation.emit();
  }

  get themes() {
    return this.clientData?.themes || [];
  }
}
