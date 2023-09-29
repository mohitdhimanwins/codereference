import { Component, Input } from '@angular/core';
import { ConfigLink } from '@entities';
import { ModalService } from '@shared/services';
import { SessionInfoDialogComponent } from '../../common';
@Component({
  selector: 'main-footer',
  templateUrl: './main-footer.component.html',
  styleUrls: ['./main-footer.component.scss']
})
export class MainFooterComponent {
  @Input() fullWidth: boolean;
  
  readonly termsOfUseLink = ConfigLink.TermsOfUse;
  readonly privacyPolicyLink = ConfigLink.PrivacyPolicy;
  
  date = new Date().getFullYear();

  constructor(
    public modalService: ModalService
  ) {}
  
  openSessionInfo() {
    this.modalService.open(SessionInfoDialogComponent, null, 'modal-sm');
  }
}
