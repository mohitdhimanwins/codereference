import { Component, EventEmitter, Output } from '@angular/core';
import { ConfigLink } from '@entities';

@Component({
  selector: 'cookie-consent',
  templateUrl: './cookie-consent.component.html',
  styleUrls: ['./cookie-consent.component.scss'],
})
export class CookieConsentComponent {
  @Output() acceptConsent = new EventEmitter();
  @Output() closeConsent = new EventEmitter();
  
  readonly privacyPolicyLink = ConfigLink.PrivacyPolicy;

  close() {
    this.closeConsent.emit();
  }

  accept() {
    this.acceptConsent.emit();
  }
}
