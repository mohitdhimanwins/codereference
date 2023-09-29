import { AfterViewInit, Component, Input } from '@angular/core';
import { ModalService } from '@shared/services';
import { ConfigItem, UserOrgInfo } from '@entities';
import { ContactDetailsDialogComponent } from '../../common';

@Component({
  selector: 'customer-footer',
  templateUrl: './customer-footer.component.html',
  styleUrls: ['./customer-footer.component.scss'],
})
export class CustomerFooterComponent implements AfterViewInit {
  @Input() userOrgInfo: UserOrgInfo;
  @Input() linkConfigItems: ConfigItem[];
  @Input() fullLayout: boolean;
  privacyPolicyLink: string;
  termsOfUseLink: string;
  date = new Date().getFullYear();
  constructor(private modalService: ModalService) {}
  ngAfterViewInit(): void {
    if (this.linkConfigItems?.length > 0) {
      this.privacyPolicyLink = this.linkConfigItems.find((items) => items.name === 'TermsOfUse')?.value as string;
      this.termsOfUseLink = this.linkConfigItems.find((items) => items.name === 'PrivacyPolicy')?.value as string;
    }
  }

  openContactAppDialog() {
    const data = this.userOrgInfo;
    this.modalService.open(ContactDetailsDialogComponent, data, 'modal-md');
  }
}
