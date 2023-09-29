import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CaptureCreditAppDialogData, DealCreateType, FeatureFlag, Permission, QuickActions } from '@entities';
import { PaymentCalculatorDialogComponent } from '@features/deals/deal-shared';
import { CaptureCreditAppDialogComponent } from '@shared/components';
import { ModalService } from '@shared/services';
import { PermissionService } from '@store/user';

@Component({
  selector: 'quick-actions',
  templateUrl: './quick-actions.component.html',
})
export class QuickActionsComponent {
  @Input() dmsImport: boolean;
  @Input() credit700Enabled: boolean;
  @Input() creditDashoardUrl: string;

  readonly creditAppsEnabledFlag = FeatureFlag.CreditAppsEnabled;
  readonly AvailablePermissions = Permission;

  isOpened: boolean;
  isNotificationPanelOpened = false;

  constructor(private router: Router, private modalService: ModalService, private permissionService: PermissionService) {}
  open() {
    this.isOpened = true;
  }

  close() {
    this.isOpened = false;
  }

  createDmsDeal() {
    this.router.navigate(['/dms-import']);
  }

  createManualDeal() {
    this.router.navigate(['/deals/new'], { queryParams: { newDeal: DealCreateType.ManualInput } });
  }

  captureAppDialog() {
    const data: CaptureCreditAppDialogData = {
      title: 'creditApp.linkSendTitle',
      dealId: null,
      hideTabs: false,
      button: {
        primaryButton: 'common.cancel',
        secondaryButton: 'common.sendLink',
      },
    };
    this.modalService.open(CaptureCreditAppDialogComponent, data, 'modal-md');
  }

  paymentCalculateDialog() {
    this.modalService.open(PaymentCalculatorDialogComponent, null, 'modal-lg');
  }

  navigateToCreditDashboard() {
    window.open(this.creditDashoardUrl, '_blank');
  }

  get hasUpdateDealPermission() {
    return this.permissionService.getUserPermissions().includes(Permission.UpdateDeal);
  }
}
