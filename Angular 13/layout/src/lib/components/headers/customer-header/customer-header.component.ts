import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { UserOrgInfo } from '@entities';
import { UtilityService } from '@shared/services';

@Component({
  selector: 'customer-header',
  templateUrl: './customer-header.component.html',
  styleUrls: ['./customer-header.component.scss'],
})
export class CustomerHeaderComponent {
  @Input() userOrgInfo: UserOrgInfo;

  constructor(public router: Router, private utilityService: UtilityService) {}

  logoutUser() {
    window.close();
  }

  openContactPage() {
    this.router.navigateByUrl(this.router.url + '/contact-us');
  }

  open(url) {
    window.open(url, '_blank');
  }

  get isCreditApp() {
    return this.router.url.includes('credit-app');
  }

  get isMobile() {
    return this.utilityService.isMobile();
  }
  get isTablet() {
    return this.utilityService.isTablet();
  }
}
